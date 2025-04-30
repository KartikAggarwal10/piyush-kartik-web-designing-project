import mongoose from "mongoose";
const regSchema = new mongoose.Schema({
    name: String,
    price:String,
    cover:String,

});
export const book = mongoose.model('books', regSchema);