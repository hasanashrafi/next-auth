import { getSession } from "next-auth/react";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";

async function handler(req, res) {
    if (req.method !== "POST") return;

    try {
        await connectDB()
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: "failed", message: "Error in connecting to DB" })
    }

    const { name, lastName, password } = req.body;

    const session = await getSession({ req })
    console.log(session);

    if (!session) {
        return res
            .status(401)
            .json({ status: "failed", message: "You are not logged" })
    }

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
        return res
            .status(404)
            .json({ status: "failed", message: "User doesn't exist" })
    }

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
        return res
            .status(422)
            .json({ status: "failed", message: "password incorrect!" })
    }

    user.name = name;
    user.lastName = lastName;
    user.save()

    res.status(200).json({
        status: "success",
        data: { name, lastName, email: session.user.email }
    })
}

export default handler