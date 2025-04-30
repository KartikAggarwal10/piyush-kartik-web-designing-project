import mongoose from "mongoose";
const regSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    role:String

});
export const mmbr = mongoose.model('members', regSchema);