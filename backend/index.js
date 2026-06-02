import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [ "http://localhost:3000"]

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials:true
  }),
);

const server = createServer(app);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

const onlineUsers = new Map();
// console.log("Online Users:", onlineUsers);

io.on("connection", (socket) => {
  // console.log("User Connected with ID : ", socket.id);

  socket.on("registerUser", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("sendMessage", async (message) => {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        message: message.text,
        seen: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving message:", error);
      socket.emit("messageError", { error: "Failed to send message" })
      return;
    }

    const receiverSocketId = onlineUsers.get(message.receiver_id);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", data);
    }
    socket.emit("receiveMessage", data);
  });

  socket.on("seen", async ({ sender_id, receiver_id }) => {
    const { error } = await supabase
      .from("messages")
      .update({ seen: true })
      .eq("sender_id", sender_id)
      .eq("receiver_id", receiver_id)
      .eq("seen", false);

    if (error) {
      console.error("Error marking seen:", error);
      return;
    }

    const senderSocketId = onlineUsers.get(sender_id);
    if (senderSocketId) {
      io.to(senderSocketId).emit("seen", { by: receiver_id });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.forEach((socketId, userId) => {
      if (socketId === socket.id) onlineUsers.delete(userId);
    });
  });
});

const messageLimiter = rateLimit({
  windowMs:15*60*1000,
  max:100,
  message: { error: "Too many requests, please try again later." }
})

app.get("/api/messages",messageLimiter, async (req, res) => {
  const { sender_id, receiver_id } = req.query;

  if (!sender_id || !receiver_id) {
    return res
      .status(400)
      .json({ error: "sender_id and receiver_id are required" });
  }

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${sender_id},receiver_id.eq.${receiver_id}),and(sender_id.eq.${receiver_id},receiver_id.eq.${sender_id})`,
    )
    .order("created_at", { ascending: true });

  if (error) return res.status(500).json({ error });
  res.json(data);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
