import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
    const session = await getServerSession(authOptions)
    if(!session?.user?.email) {
        return NextResponse.json({error: "email tidak ditemukan"}, {status: 400})
    }
    const body = await req.json()
    const {title, content, dokumentasi} = body

    if(!title||!content||!dokumentasi) {
        return NextResponse.json({error: "semua harus diisi"}, {status: 400})
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
    if(!user){{
        return NextResponse.json({error: "user tidak ditemukan"}, {status: 404})
    }}

    const slug = title.toLowerCase().replace(/\s+/g, "-")
    
    const post = await prisma.post.create({
        data: {
            title,
            content,
            dokumentasi,
            slug,
            authorId: user.id
        }
    })

    return NextResponse.json(post)

   } catch (error) {
    console.log(error)

    return NextResponse.json(
        {message: "gagal membuat post"},
        {status: 500}
    )
   }

}
