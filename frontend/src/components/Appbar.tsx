import React from 'react'
import { Avatar } from './BlogCard'
import { Link } from 'react-router-dom'

function Appbar() {
  return (
    <div className='border-b flex justify-between px-10 py-3'>
      <Link to={"/blogs"}  className='flex flex-col justify-center'>
          Medium
      </Link>
      <div>
      <Link to={"/publish"}>
      <button type="button" className="mr-4focus:outline-none text-white bg-green-700
       hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg
        text-sm px-5 py-2.5 me-2 mb-2">New</button>
      </Link>
        <Avatar name='prasad ' size="big" />
      </div>
    </div>
  )
}

export default Appbar