"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useLoading } from "@/context/loadingcontext"

export default function CreatePost(){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const { showLoading, hideLoading } = useLoading()

    const router = useRouter()

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
       try {
        e.preventDefault()
        showLoading()
        setLoading(true)

        if (!file) {
          hideLoading()
          alert("Pilih gambar dulu")
          return
        }

    const formData = new FormData()
    formData.append("file", file)

    const resupload = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await resupload.json()
    console.log(data.secure_url)

    const dokumentasi = data.secure_url

        const res = await fetch("api/post/create", {method: "POST",
            headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title, content, dokumentasi,
        })
        }
        )

        if(res.ok){
          console.log("URL dari cloudinary:", dokumentasi)
          setTitle("")
          setContent("")        
          router.push("/dashboard")
          hideLoading()
        } else{
  hideLoading()
    alert("gagal membuat post")
}
       } catch (error) {
        console.log(error)
        setLoading(false)
       } 

    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white px-6 py-10 pt-20">
          <div className="max-w-3xl mx-auto">
            
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight">
                Create New Post
              </h1>
      
              <p className="text-zinc-400 mt-2">
                Share your thoughts with the world.
              </p>
            </div>
      
            {/* Form */}
            
              
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">
                  Title
                </label>
      
                <input
                  type="text"
                  placeholder="Enter post title..."
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="
                    w-full rounded-2xl border border-zinc-800
                    bg-zinc-900 px-5 py-4
                    outline-none
                    focus:ring-2 focus:ring-white/20
                    transition
                  "
                />
              </div>
      
              {/* Image */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">
                  Cover Image
                </label>
      
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="
                    w-full rounded-2xl border border-dashed
                    border-zinc-700 bg-zinc-900
                    p-4 text-zinc-400
                    file:mr-4
                    file:rounded-lg
                    file:border-0
                    file:bg-white
                    file:px-4
                    file:py-2
                    file:text-black
                    hover:file:bg-zinc-200
                    transition
                  "
                />
              </div>
      
              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm text-zinc-300">
                  Content
                </label>
      
                <textarea
                  placeholder="Write your story..."
                  onChange={(e) =>
                    setContent(e.target.value)
                  }
                  className="
                    w-full min-h-[300px]
                    rounded-2xl border border-zinc-800
                    bg-zinc-900 px-5 py-4
                    outline-none
                    resize-none
                    focus:ring-2 focus:ring-white/20
                    transition
                  "
                />
              </div>
      
              {/* Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="
                  w-full rounded-2xl
                  bg-white text-black
                  py-4 font-semibold
                  hover:bg-zinc-200
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>
        
          </div>
        </div>
      )

}