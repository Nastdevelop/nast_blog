
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import LogoutButton from "./logout"
import Searchinput from "./searching"

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 shadow-md fixed left-0 right-0 top-0 mb-20 ">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide hover:opacity-80 transition">
          NEWS
        </h1>

<Searchinput />

        {/* Menu */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-gray-300 transition duration-200"
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                href="/register"
                className="hover:text-gray-300 transition duration-200"
              >
                Register
              </Link>

              <Link
                href="/login"
                className="px-4 py-1.5 rounded-md bg-white text-black hover:bg-gray-200 transition duration-200"
              >
                Login
              </Link>
            </>
          ) : (  
            <>
              {/* Username */}
             
              <Link
                href="/dashboard"
                className="px-4 py-1.5 rounded-md bg-white text-black hover:bg-gray-200 transition duration-200"
              >
                Dashboard
              </Link>
              

              {/* Logout */}
             <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}