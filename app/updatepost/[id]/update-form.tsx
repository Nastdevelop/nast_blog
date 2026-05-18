"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Post {
  id: number
  title: string
  content: string
}

export default function UpdateForm({ post }: { post: Post }) {
  const router = useRouter()

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [loading, setLoading] = useState(false)

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)

    const response = await fetch(`/api/post/update/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })

    setLoading(false)

    if (response.ok) {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="flex flex-col gap-5"
    >

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700">
          Content
        </label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="border border-slate-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 transition-all text-white font-semibold py-3 rounded-lg"
      >
        {loading ? "Updating..." : "Update Post"}
      </button>

    </form>
  )
}