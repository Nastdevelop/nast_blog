import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { email, password} = await req.json()
    if(!email || !password){ return NextResponse.json({error: "email dan password harus di isi"}, {status: 40})}

    const validatemail = await prisma.user.findUnique({where: {email}})
    if(validatemail){return NextResponse.json({error: "email sudah digunakan"})}

    const hashingpw = await bcrypt.hash(password, 10)
     await prisma.user.create({data:{email, password: hashingpw}})

     return NextResponse.json({success: true})
}