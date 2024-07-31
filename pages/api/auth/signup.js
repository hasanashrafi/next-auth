import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";



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
    const { email, name, lastName, password } = req.body
    if (!email || !password) {
        return res
            .status(422)
            .json({ status: "failed", message: "invalid data" })
    }

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        return res
            .status(422)
            .json({ status: "failed", message: "User already exist" })
    }
    const hashedPassword = await hashPassword(password)
    console.log(hashedPassword);

    const newUser = await User.create({ email: email, name: name, lastName: lastName, password: hashedPassword })
    console.log(newUser);

    res
        .status(201)
        .json({ status: "success", message: "User created" })
}

export default handler