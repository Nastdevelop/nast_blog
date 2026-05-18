import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import UpdateForm from "./update-form"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function UpdatePage({ params }: Props) {
  const { id } = await params

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Update Post
        </h1>

        <UpdateForm post={post} />

      </div>
    </div>
  )
}