import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        //check email is valid or not.
        if (!validator.isEmail(email)) {
            return res.json({ success: "false", message: "Please enter a valid email." })
        }

        const user = await userModel.findOne({ email });
        //check user is exists.
        if (!user) {
            return res.json({ success: "false", message: "User is not registered" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success:"false", message:"Invalid credentials!!!"})
        }

        const token = createToken(user._id);
        res.json({success:"true", token})

    } catch (error) {
        console.log(error);
        
        res.json({success: "false", message:"Error"})
    }

}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//register user

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        //check user already exist.
        if (exists) {
            return res.json({ success: "false", message: "User already exists." })
        }

        //check email is valid using validator

        if (!validator.isEmail(email)) {
            return res.json({ success: "false", message: "Please Enter a valid email." })
        }

        //check strong password
        if (password.length < 8) {
            return res.json({ success: "false", message: "Please Enter Strong Password." })
        }

        //hashing the password

        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        //register new user

        const newUser = new userModel({
            name,
            email,
            password: hashedPwd,
        })
        const user = await newUser.save();

        const token = createToken(user._id)
        res.json({ success: "true", token })

    } catch (error) {
        res.json({ success: "false", message: "Error" })
    }
}

export { loginUser, registerUser }