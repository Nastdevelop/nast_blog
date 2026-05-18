import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function POST(
  request: Request,
  { params }: Props
) {
  const { id } = await params

  await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })

  return NextResponse.redirect(new URL("/dashboard", request.url))
}