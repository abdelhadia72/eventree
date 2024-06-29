import mongoose from "mongoose";
import bcrypt from "bcrypt";

// define the schema of the user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    avatar: { type: String, default: 'http://localhost:5000/uploads/img.png'},
    rsvps: { type: [String], default: []}
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
//! (static method I guess)
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// create the model
export default mongoose.model('User', userSchema);
