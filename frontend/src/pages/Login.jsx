import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [mode, setMode] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (mode === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-white shadow-[0_0_20px_rgba(0,0,0,0.08)] rounded-xl p-10"
      >
        {/* Heading */}
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-semibold text-[#4D3B4C]">{mode}</h2>
          <span className="flex-1 h-[2px] bg-[#4D3B4C]" />
        </div>

        {/* Fields */}
        {mode === 'Sign Up' && (
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            className="field-lg"
            required
          />
        )}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="field-lg"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="field-lg"
          required
        />

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-600">
          <span className="cursor-pointer hover:text-[#4D3B4C]/90 transition">
            Forgot password?
          </span>
          {mode === 'Login' ? (
            <span
              onClick={() => setMode('Sign Up')}
              className="cursor-pointer hover:text-[#4D3B4C]/90 transition"
            >
              Create account
            </span>
          ) : (
            <span
              onClick={() => setMode('Login')}
              className="cursor-pointer hover:text-[#4D3B4C]/90 transition"
            >
              Login here
            </span>
          )}
        </div>

        {/* Button */}
        <button className="w-full bg-[#4D3B4C] hover:bg-[#3d2d3d] transition text-white text-lg py-3 rounded-md tracking-wide">
          {mode === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login
