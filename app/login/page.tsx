"use client"

import { signIn } from "next-auth/react"
import {useState} from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("")


  const handleLogin = async () => {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  })

  if (res?.error) {
    alert(res.error)
  } else {
    window.location.href = "/dashboard"
  }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-20"> 
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">
            Login to your account
          </p>
        </div>

        {/* Google Button */}
        <button
          // onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.7 2.4 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l8 6.2C12.7 13.4 17.9 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.7-.1-3-.4-4.4H24v8.3h12.4c-.5 2.7-2 5-4.2 6.6l6.5 5c3.8-3.5 6-8.7 6-15.5z"/>
            <path fill="#FBBC05" d="M10.7 28.5c-1-2.7-1-5.7 0-8.4l-8-6.2C.9 17.4 0 20.6 0 24s.9 6.6 2.7 10.1l8-5.6z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-6.5-5c-2 1.3-4.6 2-8.7 2-6.1 0-11.3-3.9-13.2-9.3l-8 5.6C6.7 42.6 14.7 48 24 48z"/>
          </svg>
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" /> 
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black  focus:ring-black focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
            type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button onClick={handleLogin} className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Sign In
          </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-black font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}