const posts = [
  {
    "id": 1,
    "title": "Understanding Node.js Event Loop",
    "slug": "understanding-nodejs-event-loop",
    "author": "Tech Insights",
    "createdAt": "2025-01-10T10:30:00Z",
    "updatedAt": "2025-01-12T09:15:00Z",
    "tags": ["nodejs", "javascript", "backend"],
    "thumbnail": "https://example.com/images/event-loop.png&quot" ,
    "content": "The Node.js event loop enables asynchronous, non-blocking operations by managing tasks through multiple phases..."
  },
  {
    "id": 2,
    "title": "Mastering Next.js Routing",
    "slug": "mastering-nextjs-routing",
    "author": "Web Dev Tutorials",
    "createdAt": "2025-02-01T09:00:00Z",
    "updatedAt": "2025-02-03T11:20:00Z",
    "tags": ["nextjs", "react", "routing"],
    "thumbnail": "https://example.com/images/nextjs-routing.png&quot",
    "content": "Next.js offers a powerful file-based routing system that simplifies navigation and supports dynamic routing..."
  },
  {
    "id": 3,
    "title": "Top 10 SEO Tips to Boost Website Ranking",
    "slug": "top-10-seo-tips",
    "author": "SEO Daily",
    "createdAt": "2025-03-05T08:00:00Z",
    "updatedAt": "2025-03-06T14:10:00Z",
    "tags": ["seo", "web-performance", "ranking"],
    "thumbnail": "https://example.com/images/seo-tips.png&quot",
    "content": "Improving your website's SEO requires focusing on content quality, speed optimization, backlinks, and mobile responsiveness..."
  },
  {
    "id": 4,
    "title": "A Beginner’s Guide to REST APIs",
    "slug": "beginners-guide-to-rest-api",
    "author": "API Academy",
    "createdAt": "2025-03-15T12:20:00Z",
    "updatedAt": "2025-03-17T09:40:00Z",
    "tags": ["api", "rest", "backend"],
    "thumbnail": "https://example.com/images/rest-api.png&quot",
    "content": "REST APIs allow communication between client and server using HTTP methods such as GET, POST, PUT, and DELETE..."
  },
  {
    "id": 5,
    "title": "Introduction to Tailwind CSS",
    "slug": "introduction-to-tailwind-css",
    "author": "Frontend Mastery",
    "createdAt": "2025-04-02T07:45:00Z",
    "updatedAt": "2025-04-04T11:00:00Z",
    "tags": ["tailwind", "css", "frontend"],
    "thumbnail": "https://example.com/images/tailwind-css.png&quot",
    "content": "Tailwind CSS is a utility-first CSS framework that enables rapid UI development through predefined classes..."
  }
]

export default function Example() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">From the blog</h2>
          <p className="mt-2 text-lg/8 text-gray-300">Learn how to grow your business with our expert advice.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.createdAt} className="text-gray-400">
                  {post.createdAt}
                </time>
                <a
                  href={`/blog/${post.slug}`}
                  className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800"
                >
                  {post.title}
                </a>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300">
                  {/* <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a> */}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">{post.content}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src={post.thumbnail} className="size-10 rounded-full bg-gray-800" />
                <div className="text-sm/6">
                  <p className="font-semibold text-white">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-400">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
