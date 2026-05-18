import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const cursor = searchParams.get("cursor")
  const search = searchParams.get("search") || ""

  const posts = await prisma.post.findMany({
    take: 6, // ✅ LIMIT 6 DATA
    skip: cursor ? 1 : 0,
    cursor: cursor
      ? { id: Number(cursor) }
      : undefined,

    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  })

  return NextResponse.json(posts)
}