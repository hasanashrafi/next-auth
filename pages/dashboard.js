import { getSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import React, { useState } from 'react'

function Dashboard() {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const updateHandler = async () => {
        const res = await fetch("/api/update-info", {
            method: "POST",
            body: JSON.stringify({ name, lastName, password }),
            headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()
        console.log(data);
    }

    return (
        <div className=' min-h-screen p-5 '>
            <h2 className="w-fit border-b-2 p-2 text-indigo-700 font-semibold border-b-blue-700 ">
                Dashboard
            </h2>
            <Link href="/" className='block w-fit p-2 rounded bg-gray-600 text-white m-5'>Home</Link>

            <div className='flex flex-col lg:flex-row lg:gap-x-5  w-[50%] items-center mx-auto  p-5 gap-y-5'>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='p-1 w-full rounded outline-none'
                    type='text'
                    placeholder='Enter your name' />
                <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className='p-1 w-full rounded outline-none'
                    type='text'
                    placeholder='Enter your name' />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='p-1 w-full rounded outline-none'
                    type='password'
                    placeholder='Enter your password' />
                <button
                    onClick={updateHandler}
                    className='bg-green-500 text-white p-2 w-[50%] rounded'>Save</button>
            </div>
        </div>
    )
}

export default Dashboard

export async function getServerSideProps({ req }) {

    const session = await getSession({ req })
    console.log(session);

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        }
    }
    return { props: { session } }
}