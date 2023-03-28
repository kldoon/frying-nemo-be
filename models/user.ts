import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [String],
        default: [`User`],
    },
    fullName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String
    },
})


const User = model(`User`, userSchema);

export default User;