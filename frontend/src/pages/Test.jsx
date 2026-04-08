import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { BaseApi } from "@/api/instance/api";
import { MoveRight } from "lucide-react";
import { format } from "date-fns";

const Test = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const res = await BaseApi.get("/rest/v1/workspaces?select=*");
        console.log("fetching ws", res.data);
        setData(res.data);
      } catch (error) {
        console.log("Error in fetching workspaces", error);
      }
    };

    fetchWorkspace();
  }, []);

  return (
    <>
      <h1>Hello</h1>
      <div className="grid grid-cols-3 gap-3">
        {data?.map((ws) => (
          <div key={ws.id} className="bg-white shadow-xl hover:scale-102 ease-out transition-transform duration-300 rounded-2xl p-5">
            {/* <div className="w-full h-1 bg-linear-to-r from-slate-950 via-secondary to-primary"></div> */}
            <h1 className="text-lg font-bold">{ws.workspace_name}</h1>
            <p className="font-mono bg-gray-100 p-1 text-xs w-fit">
              #{ws.id.slice(0, 8)}
            </p>
            <br />

            <p className="text-gray-600 font-medium text-md">
              {ws.description}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mt-2 tracking-wide text-xs font-medium">
                  CREATED BY :{" "}
                  <span className="bg-purple-100 rounded-2xl p-1 text-purple-500">
                    {ws.creatorName}
                  </span>
                </p>
                <p className=" text-gray-400 mt-2 tracking-wide text-xs font-medium">Updated : <span>{format(ws.updated_at,"MMM do, yyy")}</span></p>
              </div>
              <div className="bg-black rounded-lg p-1">
                <MoveRight size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
// const response = await BaseApi.get("/rest/v1/workspaces?select=*");
