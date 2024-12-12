import User from "../models/User.js";
import { hash } from "bcrypt";
export const userSignup = async (req, res, next) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const hashpassword = await hash(password, 10);
        const user = new User({ name, email, password: hashpassword });
        await user.save();
        return res.status(200).json({ message: "ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "ok", User });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=uesrcontrollers.js.map