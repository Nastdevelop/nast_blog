import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(
  request: Request,
  { params }: Props
) {
  const { id } = await params

  const body = await request.json()

  const updatedPost = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title: body.title,
      content: body.content,
    },
  })

  return NextResponse.json(updatedPost)
}