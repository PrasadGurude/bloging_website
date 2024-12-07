import React, { ChangeEvent, useState } from 'react'
import Appbar from '../components/Appbar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

export default function Publish() {
    const [post, setPost] = useState({
        title: "",
        content: ""
    })

    const navigate = useNavigate();

    return (
        <div>
            <Appbar />
            <div className='flex justify-center'>
                <div className='max-w-lg w-full pt-3'>
                    <label className="block mb-2 text-sm font-medium
             text-gray-900 dark:text-white">Title</label>
                    <input type="text" name='title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title " onChange={(e) => {
                            setPost({ ...post, [e.target.name]: e.target.value })
                        }} />
                </div>
            </div>
            <div className='flex justify-center '>
                <div className='max-w-lg w-full'>
                    <TextEditor onChange={(e) => {
                        setPost({ ...post, [e.target.name]: e.target.value })
                    }} />
                    <button type="submit" className="ml-5 inline-flex items-center px-5 py-2.5
                     text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4
                      focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" onClick={async () => {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, post,{
                                headers:{
                                    Authorization : `barer ${localStorage.getItem("token")}`
                                }
                            })
                            navigate(`/blog/${response.data.id}`)
                        }}>
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    )
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div >
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <label className="sr-only">Publish post</label>
                <textarea name='content' id="editor" rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white border dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 p-3 px-3  border-slate-400 rounded-lg" placeholder="Write an content..." required onChange={onChange} ></textarea>
            </div>

        </div >
    )
}

