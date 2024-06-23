import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

// define the schema of the user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
},{timestamps: true});


// hash the password before save it into database
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error){
        next(error);
    }
});

// compare the password with the hashed one
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// create the model
const User = mongoose.model('User', userSchema);