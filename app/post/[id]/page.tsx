import prisma from "@/lib/prisma"; 
import { notFound } from "next/navigation";
import Link from "next/link";


export default async function DetailPost({ params }: {params: Promise<{id: string;}>}) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 py-30 px-5 "> 
      
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Banner */}
        <div className="h-[300px] bg-gradient-to-br from-green-500 to-emerald-800" />

        <div className="p-8">
          
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Kembali
          </Link>

          <h1 className="text-5xl font-bold text-slate-800 mt-5 leading-tight">
            {post.title}
          </h1>

          <p className="text-slate-400 mt-3">
            Dibuat pada{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-10 border-t pt-8">
            <p className="text-lg leading-9 text-slate-700 whitespace-pre-line">
              {post.content}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}