// cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

export const cart = mongoose.model("cart", cartSchema);
