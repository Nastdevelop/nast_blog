import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

export const metadata = {
  title : "dashboard"
}

export default async function DashboardPage({searchParams} : {searchParams :  Promise<{ search?: string }>}) {
  const session = await getServerSession(authOptions)

  const params = await searchParams
  const search = params.search || ""

  if (!session?.user?.email) {
    return <div>Unauthorized</div>
  }

  const posts = await prisma.post.findMany({
    where: {
      ...(search && {
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
      }),
      author: {
        email: session.user.email,
      },
    },
    
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="min-h-screen flex bg-gray-100 pt-20">
      
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back, {session.user.name}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Total Posts</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {posts.length}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Published</p>
            <h3 className="text-3xl font-bold text-green-600">
              {posts.length}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Draft</p>
            <h3 className="text-3xl font-bold text-yellow-500">
              0
            </h3>
          </div>

        </div>

        {/* Post List */}
        <div className="mt-10">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">
              My Posts
            </h2>

            <Link
              href="/createPost"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Create Post
            </Link>
          </div>

          <div className="grid gap-5">

            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {post.content}
                    </p>

                    <p className="text-sm text-gray-400 mt-3">
                      {new Date(post.createdAt).toLocaleDateString()}  
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">

                    <Link
                      href={`/updatepost/${post.id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                    >
                      Update
                    </Link>

                    <form action={`/api/post/delete/${post.id}`} method="POST">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </form>

                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>

      </main>
    </div>
  )
}