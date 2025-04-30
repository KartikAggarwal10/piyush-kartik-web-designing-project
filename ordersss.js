import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  price: Number,
  buyerName: String,
  buyerEmail: String,
  buyerPhone: String,
  paymentType: String,
  feedback: String,
  date: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false }
});

export const OrdersCollection = mongoose.model('order', orderSchema);
