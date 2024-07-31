import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
    session: { strategy: "jwt" },
    providers: [CredentialsProvider({
        name: "credentials",
        credentials: {
            email: {
                label: "Email",
                type: "text",
                placeholder: "Enter Your Email"
            },
            Password: {
                label: "Password",
                type: "Password",
                placeholder: "Enter Your Password"
            },
        },
        async authorize(credentials, req) {
            return ({ name: "hasan" })
        }
    })
    ]
}


export default NextAuth(authOptions)