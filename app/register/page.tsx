"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default  function RegisterPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [read, setRead] = useState(false)

const handleregister = async() => {
    const res = await fetch("/api/auth/register", {method: "POST" ,
        headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({ email, password})  
    })
      const data = await res.json()
  if(!res.ok) {
      alert(data.error)
  }
  router.push("/")
}

return (
    <div className="w-[350px] bg-slate-800 mx-auto mt-30 px-7 py-8 rounded-xl shadow-lg">
      
      <h1 className="text-2xl font-bold text-center text-white mb-8">
        Registrasi Akun
      </h1>
  
      <div className="flex flex-col gap-5">
  
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-200">Email</label>
          <input
            type="text"
            placeholder="Masukkan email"
            className="px-3 py-2 rounded-lg border border-slate-500 bg-slate-700 text-white outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-200">Password</label>
  
          <div className="flex items-center bg-slate-700 border border-slate-500 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
            <input
              type={read ? "text" : "password"}
              placeholder="Masukkan password"
              className="flex-1 px-3 py-2 bg-transparent text-white outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <button
              type="button"
              className="px-4 text-sm text-green-400 hover:text-green-300 cursor-pointer"
              onClick={() => setRead((prev) => !prev)}
            >
              {read ? "Tutup" : "Lihat"}
            </button>
          </div>
        </div>
  
        {/* Button */}
        <button
          className="mt-3 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200 cursor-pointer"
          onClick={handleregister}
        >
          Registrasi
        </button>
      </div>
    </div>
  )

}