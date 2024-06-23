import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// generate token
const GenerateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '6d'});
}


// register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        const userExist = await User.findOne({email});
        if(userExist) return res.status(400).json({message: "User already exist"});
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
            res.status(400).json({message: "Invalid credentials"});
        }

        const jwtToken = GenerateToken(user._id);

        res.status(200).json({user, jwtToken})
    }catch (error){
        res.status(500).json({message: "Internal server error (Login)"})
    }
}

export {registerUser, loginUser}