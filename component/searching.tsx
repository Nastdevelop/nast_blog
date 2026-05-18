  "use client"

  import { usePathname, useRouter } from "next/navigation"
  import { useState } from "react"


  export default function Searchinput() {
      const router = useRouter()
      const pathname = usePathname()
      const [value, setValue] = useState("")

      const tampilsearch = pathname === "/" || pathname === "/dashboard"
      if (!tampilsearch){
          return null
      }

      const handleChange = (val: string) => {
        setValue(val)
        router.push(`${pathname}?search=${val}`)
      }

      
    return(
      <div className="flex items-center">
        <input
      type="text"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Search..."
      className="
        pl-4 pr-8 py-2 rounded-xl
        bg-zinc-800 text-white
        outline-none
        w-64
      "
    />
    <button onClick={() => handleChange("")} className="font-semibold text-xl relative right-8 hover:bg-white/20 px-2  rounded-full">X</button>
      </div>
    )
}