import { Blog } from "../hooks"
import Appbar from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className='grid grid-cols-12 px-10 w-full pt-2' >
        <div className='col-span-8'>
          <div className="text-3xl font-extrabold">
            {blog.title}
          </div>
          <div className="text-slate-500 pt-2">
            Post on 2nd December 2023
          </div>
          <div>
            {blog.content}
          </div>
        </div>
        <div className='col-span-4'>
          <div className="text-lg text-slate-600">
          Author
          </div>
          <div className="flex">
            <div className="pr-4 flex flex-col justify-center">
              <Avatar size="big" name={blog.author.name || "Anonymous"} />
            </div>
            <div>
              <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
              </div>
              <div className="pt-2 text-slate-500">
                Random catch phrase about the author's ability to grab the user's attention
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
