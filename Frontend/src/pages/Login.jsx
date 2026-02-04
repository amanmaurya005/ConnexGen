import { useState } from 'react';
import instance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function Login() {
  const navigate=useNavigate();

  const [data,setData]=useState({
    email:"",
    password:"",
  })

  function handleChange(e){
    const {name,value}=e.target;
    setData({...data,[name]:value});
  }

  async function handleSubmit(e){
    e.preventDefault();
    try{
      await instance.post("/user/login",data,{
        withCredentials:true,
      });
      toast.success("Login successful 🎉");
      navigate("/")
    }
    catch(error){
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center 
                   bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-4"
      >
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-2xl 
                     bg-white/15 backdrop-blur-xl 
                     border border-white/20 
                     shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center text-white">
            Welcome Back
          </h2>
          <p className="text-center text-white/80 text-sm mt-1">
            Login to your account
          </p>

          <div className="mt-6 space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                type="email"
                name='email'
                onChange={handleChange}
                placeholder='you@example.com'
                className="w-full px-4 py-2 rounded-lg 
                           bg-white/80 text-gray-900 
                           placeholder-gray-500 
                           focus:outline-none focus:ring-2 
                           focus:ring-cyan-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                type="password"
                name='password'
                onChange={handleChange}
                placeholder='••••••••'
                className="w-full px-4 py-2 rounded-lg 
                           bg-white/80 text-gray-900 
                           placeholder-gray-500 
                           focus:outline-none focus:ring-2 
                           focus:ring-cyan-400 transition"
              />
            </div>

            {/* Button */}
            <button
              type='submit'
              className="w-full mt-2 py-2.5 rounded-lg 
                         font-semibold text-white
                         bg-gradient-to-r from-cyan-400 to-blue-500
                         hover:from-cyan-500 hover:to-blue-600
                         transition shadow-lg"
            >
              Login
            </button>
          </div>

          <p className="text-center text-sm text-white/80 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-white font-semibold hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </>
  )
}
