import Auth from "../models/auth.js"
import jwt from "jsonwebtoken";


export async function login(req, res) {
    try {
        const user = req.body;
        console.log(user)
        const userExist = await Auth.findOne({ email: user.email });
        if (!userExist) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== userExist.password) {
            return res.status(404).json({ message: "Password not match" });
        }

        const auth_token = jwt.sign({
            id: userExist._id,
            name: userExist.username,
        },
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
        );

        res.cookie("auth_token", auth_token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600 * 1000,
        })

        return res.status(200).json({ message: "LoggedIn successfully" })
    }

    catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export async function register(req, res) {
    try {
        const user = req.body;
        console.log("user", user)
        const userExist = await Auth.findOne({ email: user.email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exist" });
        }
        const usernameExist = await Auth.findOne({ username: user.username });
        if (usernameExist) {
            return res.status(400).json({ message: "Username already exist" });
        }
        const phoneExist = await Auth.findOne({ phone: user.phone });
        if (phoneExist) {
            return res.status(400).json({ message: "Phone already exist" });
        }

        const newUser = new Auth(user);
        await newUser.save();
        return res.status(200).json({ message: "User registerd successfully", user: newUser })
    }
    catch (error) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}

export function checkAuth(req, res) {
  return res.status(200).json({
    success: true,
    message: "Token is valid",
    user: req.user,      // from middleware
    userId: req.userId,
  });
}
