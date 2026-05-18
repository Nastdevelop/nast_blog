"use client"

import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 transition duration-200"
    >
      Logout
    </button>
  )
}