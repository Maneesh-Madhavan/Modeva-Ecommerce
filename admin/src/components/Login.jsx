import React, { useState } from "react";
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md space-y-6 bg-white shadow-[0_0_20px_rgba(0,0,0,0.08)] rounded-xl p-10"
      >
        {/* Heading */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl font-semibold text-[#4D3B4C]">Admin Panel</h1>
          <span className="flex-1 h-[2px] bg-[#4D3B4C]" />
        </div>

        {/* Fields */}
        <div>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-4 outline-none focus:ring-1 focus:ring-[#4D3B4C]"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-4 outline-none focus:ring-1 focus:ring-[#4D3B4C]"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#4D3B4C] hover:bg-[#3d2d3d] text-white text-lg py-3 rounded-md tracking-wide transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
