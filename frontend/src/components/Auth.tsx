import { signupInput } from '@prasadgurude/meduyn-common';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BACKEND_URL } from '../config';


function Auth({ type }: { type: "signup" | "signin" }) {

    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<signupInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest() {
        try{
            const response = axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
            const jwt = (await response).data;
            localStorage.setItem("token",jwt);
            console.log(jwt);
            navigate('/blogs')
        }catch(e){
            console.log(e)
            console.log("error while sendind or reciveing the signup of singin data")
        }
    }

    return (
        <div className='h-screen flex justify-center flex-col'>
            <div className='flex justify-center'>
                <div>
                    <div className='text-3xl font-extrabold'>
                        {type === "signup" ? " Create an account" : "Login to your account"}
                    </div>
                    <div className='text-slate-500 '>
                        {type === "signin" ? "Dont have an account?" : "already have an account?"} <Link className='underline' to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "sign up" : "sign in"}</Link>
                    </div>
                    <div className='bg-gray-100 '>
                        {type === "signup" ? <LabelledInput label='name' placeholder='Prasad Gurude' onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                [e.target.name]: e.target.value
                            }))
                            console.log(postInputs)
                        }}
                        /> : null}
                        <LabelledInput label='username' placeholder='p@gmail.com' onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                [e.target.name]: e.target.value
                            })),
                                console.log(postInputs)
                        }} />

                        <LabelledInput label='password' type={"password"} placeholder='123456' onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                [e.target.name]: e.target.value
                            }))
                            console.log(postInputs)

                        }} />

                        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                          dark:focus:ring-gray-700 dark:border-gray-700 w-full ">{type === "signup" ? "Sign up" : "Sign in"}</button>


                    </div>
                </div>
            </div>



        </div>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className='p-2'>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} name={label} type={type || "type"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>


    )
}

export default Auth