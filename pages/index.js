import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


export default function Home() {
  const { status } = useSession()
  console.log({ status });

  const logOutHandler = () => {
    signOut()
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-10 `}
    >
      <div className="flex justify-between z-10 max-w-5xl w-full items-center  font-mono text-sm ">
        <h2 className="border-b-2 p-2 my-5">Next Auth</h2>
        {
          status === "authenticated" ? (
            <div>
              <button
                className="p-2 rounded bg-green-600 m-1 text-white">
                <Link href="/dashboard">Dashboard</Link>
              </button>
              <button onClick={logOutHandler}
                className="p-2 rounded bg-red-600 m-1 text-white">
                LogOut
              </button>
            </div>
          ) : null
        }
        {
          status === "unauthenticated" ? (
            <div>
              <button className="p-2 rounded bg-blue-600 m-1 text-white">
                <Link href="/signup">SignUp</Link>
              </button>
              <button
                className="p-2 rounded bg-blue-600 m-1 text-white">
                <Link href="/signin">SignIn</Link>
              </button>
            </div>
          ) : null
        }
      </div>
    </main>
  );
}
