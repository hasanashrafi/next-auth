import { signIn } from "next-auth/react";
import Link from "next/link";


export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <div className="z-10 max-w-5xl w-full items-center  font-mono text-sm ">
        <h2 className="border-b-2">Next Auth</h2>
       
        <button className="p-2 rounded bg-blue-600 m-1 text-white">
          <Link href="/signup">SignUp</Link>
        </button>
        <button
          className="p-2 rounded bg-blue-600 m-1 text-white">
          <Link href="/signin">SignIn</Link>
        </button>
         <button
          className="p-2 rounded bg-blue-600 m-1 text-white">
          <Link href="/dashboard">Dashboard</Link>
        </button>
     
      </div>
    </main>
  );
}
