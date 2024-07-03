import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import validator from 'validator';

// generate token
const GenerateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '6d'});
}


// register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        // check for the fields
        if(!email, !username, !password) return res.status(400).json({message: "All fields are required"})

        const existUser = await User.findOne({username});
        const existEmail = await User.findOne({email});

        // check if the username or email already exist
        if(existUser) return res.status(400).json({message: "Username already exist"});
        if(existEmail) return res.status(400).json({message: "Email already exist"});

        if(!validator.isStrongPassword(password)) return res.status(400).json({message: "Password is weak"});
        const newUser = await User.create({username, email, password});

        const jwtToken = GenerateToken(newUser._id)
        res.status(201).json({user: newUser, token: jwtToken});

    } catch (error){
        res.status(500).json({message: "Internal server error"});
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            res.status(400).json({message: "Wrong password"});
        }

        const jwtToken = GenerateToken(user._id);

        res.status(200).json({user, jwtToken})
    }catch (error){
        res.status(500).json({message: "Internal server error (Login)"})
    }
}

const updateUser = async (req, res) => {
    const { ...userData } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        res.status(200).json({user, jwtToken})
    }catch (error){
        res.status(500).json({message: "Internal server error (Login)"})
    }
}

export {registerUser, loginUser, updateUser}