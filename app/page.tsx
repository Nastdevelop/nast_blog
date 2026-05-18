
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home({searchParams} : {searchParams :  Promise<{ search?: string }>}) {

  const params = await searchParams
  const search = params.search || ""
      
  const posts = await prisma.post.findMany({
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
  });

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-20 ">
      
      <div className="max-w-6xl mx-auto">
        
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-7">
          
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200"
            >
              
              {/* Thumbnail Dummy */}
              {post.dokumentasi ? (
  <Image
  width={500}
  height={300}
    src={post.dokumentasi}
    alt={post.title}
    className="h-48 w-full object-cover"
  />
) : (
  <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-700" />
)}
              <div className="p-5 flex flex-col gap-4 justify-between">
                
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-slate-500 mt-2 text-sm line-clamp-3">
                    {post.content}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  
                  <span className="text-xs text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>

                  <Link
                    href={`/post/${post.id}`}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all"
                  >
                    Baca Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 