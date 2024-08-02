import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
  
    const loginHandler = async () => {
        const res = await signIn("credentials", {
            email, password,redirect:false
        })
       if(!res.error) router.replace("/dashboard")
    }


return (
    <div className='min-h-screen p-10'>
        <div className='flex flex-col  w-full h-screen p-5 mx-auto bg-indigo-800 rounded '>
            <div className='w-[50%] mx-auto bg-indigo-400 flex flex-col gap-y-5 rounded p-5 my-auto'>
                <p className='text-center text-white font-semibold text-xl border-b-2 p-1'>Sign In</p>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='text'
                    placeholder='Email'
                    className='w-[90%] mx-auto p-1.5 rounded' />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='Password'
                    className='w-[90%] mx-auto p-1.5 rounded' />
                <div className='flex mx-auto justify-center w-[50%]'>
                    <button
                        onClick={loginHandler}
                        className='bg-indigo-800 p-2 text-white hover:bg-white hover:text-indigo-600 ease-in-out rounded w-full' >
                        Sign In
                    </button>
                </div>
            </div>
        </div>

    </div>
)
}

export default Signin