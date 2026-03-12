import { Lock, User2,EyeOff, EyeIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, replace, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginThunk } from "../../features/auth/authSlice";

const Login = () => {
  const usernameRef = useRef(null);
  const dispatch = useDispatch();
  //const { isLoading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  const toggleVisibility = () =>{
    setIsVisible(!isVisible)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const credentials = {
      username: username.trim(),
      password: password.trim(),
    };

    if (!username || !password) {
      toast.error("Please enter valid credentials");
      return;
    }

    try {
      const responseData = await dispatch(loginThunk(credentials)).unwrap();
      if (responseData.user.role === "admin" ||responseData.user.role === "Admin"  ) {
        navigate("/admin/dashboard", {replace:true})
       // console.log(`Welcome ${responseData.user.first_name}`);
        toast.success(`Welcome ${responseData.user.first_name}`)
      } else {
        navigate("/for-you", {replace:true})
        //console.log(`Welcome ${responseData.user.first_name} ${responseData.user.last_name}`);
        toast.success(`Welcome ${responseData.user.first_name}`)
      }
    } catch (error) {
      toast.error(error || "No user found. Please try again");
      console.log(`Login Error:`, error);
    } finally {
      console.log("Login flow executed");
    }
  };

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-50 selection:bg-primary selection:text-white">
      <div className="w-full h-64 md:min-h-screen md:w-1/2 relative overflow-hidden bg-darkest order-1 md:order-2 shadow-inner">
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent z-10 md:hidden"></div>
        <img
          src="/login3.jpg"
          alt="TaskForge Platform"
          className="absolute inset-0 w-full h-full object-contain object-center z-0"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 order-2 md:order-1 relative z-20 -mt-10 md:mt-0">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-gray-200/60 border border-gray-100 backdrop-blur-sm">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black tracking-tight text-darkest mb-3">
              TaskForge
            </h1>
            <p className="text-xs uppercase font-bold tracking-widest text-secondary/70 bg-gray-100 inline-block px-3 py-1 rounded-full">
              Plan it. Track it. Finish it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-bold text-darkest ml-1"
              >
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User2
                    size={20}
                    className="text-gray-400 group-focus-within:text-primary transition-colors duration-200"
                  />
                </div>
                <input
                onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  ref={usernameRef}
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-200 bg-gray-50/50 rounded-2xl text-darkest placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-darkest"
                >
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    size={20}
                    className="text-gray-400 group-focus-within:text-primary transition-colors duration-200"
                  />
                </div>
                <input
                onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                   type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-200 bg-gray-50/50 rounded-2xl text-darkest placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                />
                 <span
                onClick={toggleVisibility}
                className="absolute right-3 mt-6.5 -translate-y-1/2 cursor-pointer text-primary"
              >
                {isVisible ? <EyeOff size={20} /> : <EyeIcon size={20} />}
              </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-darkest hover:bg-secondary text-white font-bold text-lg py-4 px-4 rounded-2xl shadow-lg shadow-darkest/30 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Sign In
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
