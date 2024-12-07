import { BlogCard } from '../components/BlogCard'
import Appbar from '../components/Appbar'
import { useBlogs } from '../hooks'

function Blogs() {

  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <Appbar />
      <div className='flex justify-center '>
        <div className=' '>

          {
            blogs.map(blog => <BlogCard
              id={blog.id}
              authorName={blog.author.name || "default"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"} />
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Blogs   