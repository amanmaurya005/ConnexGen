import React from 'react'
import { useState } from 'react'
import instance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function Register() {
    const navigate=useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        role: "",
    })

    function handleChange(e) {
        const {name,value}=e.target;
        setData({...data,[name]:value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await instance.post("/user/register",data, {
                withCredentials:true,
            });
            toast.success("Registration successful 🎉");
            navigate("/login")
        }
        catch(error){
            toast.error(error.response?.data?.message || "Registration failed");
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
                Create Account
              </h2>
              <p className="text-center text-white/80 text-sm mt-1">
                Join our social world
              </p>

              <div className="mt-6 space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name='name'
                    onChange={handleChange}
                    value={data.name}
                    required
                    placeholder='John Doe'
                    className="w-full px-4 py-2 rounded-lg 
                               bg-white/80 text-gray-900 
                               placeholder-gray-500 
                               focus:outline-none focus:ring-2 
                               focus:ring-cyan-400 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name='email'
                    onChange={handleChange}
                    value={data.email}
                    required
                    placeholder='you@example.com'
                    className="w-full px-4 py-2 rounded-lg 
                               bg-white/80 text-gray-900 
                               placeholder-gray-500 
                               focus:outline-none focus:ring-2 
                               focus:ring-cyan-400 transition"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name='username'
                    onChange={handleChange}
                    value={data.username}
                    required
                    placeholder='@username'
                    className="w-full px-4 py-2 rounded-lg 
                               bg-white/80 text-gray-900 
                               placeholder-gray-500 
                               focus:outline-none focus:ring-2 
                               focus:ring-cyan-400 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Phone
                  </label>
                  <input
                    type="number"
                    name='phone'
                    onChange={handleChange}
                    value={data.phone}
                    required
                    placeholder='9876543210'
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
                    value={data.password}
                    required
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
                  Register
                </button>
              </div>

              <p className="text-center text-sm text-white/80 mt-6">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-white font-semibold hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </>
    )
}
