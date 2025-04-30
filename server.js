import path from "path";
import express from "express"
import { fileURLToPath } from 'url';
import cors from "cors";
import { book } from "./books.js";
import fs from "fs";
import multer from "multer";
import mongoose from "mongoose";
import { mmbr } from "./signup.js";
import nodemailer from 'nodemailer';
import { cart } from "./crt.js";
import {OrdersCollection} from "./ordersss.js";
const port =3000;
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//app.use('/people', express.static(path.join(__dirname, 'people')));
app.use( express.static(path.join(__dirname, 'imges')));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/librry")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Connection Error:", err));
let x;
const uploadDir = path.join(__dirname, "people");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'people')
  },
  filename: function (req, file, cb) {
    x = `${Date.now()}-${file.originalname.replaceAll(" ","-")}`;
    cb(null, x);}
})
const upload = multer({ storage: storage })
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'aggarwalkartik956@gmail.com', 
      pass: 'jjgv njvh jewo grhu'     
  }
});
app.get('/home',(req,res)=>{
  res.sendFile(path.join(__dirname, "home.html"));
})
app.get('/signup',(req,res)=>{
  
  res.sendFile(path.join(__dirname, "signup.html"));
})
app.post('/signup',(req,res)=>{
  const {name,email,password,cd,role} = req.body;
  if(password===cd){
      const t = new mmbr({name, email,password,role}) 
      t.save();
      return res.redirect("/");
  }
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});
app.get("/portfolio-piyush",(req,res)=>{
res.sendFile(path.join(__dirname,"port-piysh.html"));
});
app.get("/portfolio-krtk",(req,res)=>{
  res.sendFile(path.join(__dirname,"port-krtk.html"));
  });
app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const x = await mmbr.findOne({ email, password });

    if (x) {
     if(x.role==="admin"){
     res.redirect("/orderbckend");
     }
     else{
      res.redirect("/home");
     }
    } 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
app.post('/signup',(req,res)=>{
  const {name,email,password,cd,country} = req.body;
  if(password===cd){
      const t = new mmbr({name, email,password,country}) 
      t.save();
      return res.redirect("/");
  }
})
app.get('/cart',(req,res)=>{
  res.sendFile(path.join(__dirname, "crt.html"));
})

app.post('/home',(req,res)=>{
  const{isOdd , bookTitle} = req.body;
  if(isOdd){
    res.json({bookTitle,bookPrice, bookImage})
  }
})
app.use('/people', express.static(path.join(__dirname, 'people')));
app.get('/add',(req,res)=>{
  res.sendFile(path.join(__dirname, "dd.html"));
})
app.post('/add',upload.single('cover'),async(req,res)=> {
  const imageBuffer = fs.readFileSync(req.file.path);
  const { name, price} = req.body;
  const pepl = new book({ name, price, cover:x});
  await pepl.save();
  return res.redirect("/");
})
app.get('/bdisp', async (req,res)=>{
  const x = await book.find({});
  res.json({books:x});
})
app.get('/about',(req,res)=>{
  res.sendFile(path.join(__dirname, "about.html"));
})
app.get('/crte',(req,res)=>{
  res.sendFile(path.join(__dirname, "crate.html"));
})
app.get('/orderbckend',(req,res)=>{
  res.sendFile(path.join(__dirname, "orderbackend.html"));
})
app.get('/order',(req,res)=>{
  res.sendFile(path.join(__dirname, "order.html"));
})
app.get('/userproduct',(req,res)=>{
  res.sendFile(path.join(__dirname, "userproduct.html"));
})
app.get('/shop',(req,res)=>{
  res.sendFile(path.join(__dirname, "userproduct.html"));
})
app.get('/pge1pro',(req,res)=>{
  res.sendFile(path.join(__dirname, "page1pro.html"));
})
app.post("/pge1pro", upload.single('cover') , async(req,res)=>{
  const imageBuffer = fs.readFileSync(req.file.path);
  const { name, price} = req.body;
  const pepl = new book({ name, price, cover:x});
  await pepl.save();
  return res.redirect("/");
})
// delete product by id
app.delete('/deleteproduct/:id', async (req, res) => {
  try {
      const id = req.params.id;
      await book.findByIdAndDelete(id);
      res.json({ message: "Product deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
  }
});
// update product price by id
app.put('/updateproduct/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const { price } = req.body;
      await book.findByIdAndUpdate(id, { price });
      res.json({ message: "Product updated successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error updating product" });
  }
});

app.get('/contact',(req,res)=>{
  res.sendFile(path.join(__dirname, "contactus.html"));
})
app.get('/search',(req,res)=>{
  res.sendFile(path.join(__dirname, "serch.html"));
})
app.get('/msg',(req,res)=>{
  res.sendFile(path.join(__dirname, "message.html"));
})
app.post("/send-suggestion", async (req, res) => {
  const { email, name, phone, message } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const mailOptions = {
    from: 'aggarwalkartik956@gmail.com',
    to: email,
    subject: "Thank you for contacting us!",
    html: `
      <h3>Name: ${name}</h3>
      <h4>Phone: ${phone}</h4>
      <p>Message: ${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Contact email sent successfully." });
  } catch (error) {
    console.error("Contact email failed:", error);
    res.status(500).json({ message: "Failed to send contact email." });
  }
});
app.post('/addtocart', async (req, res) => {
  try {
    const { bookId } = req.body;

    let cartItem = await cart.findOne({ bookId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new cart({ bookId, quantity: 1 });
      await cartItem.save();
    }

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});
app.get('/cartitems', async (req, res) => {
  try {
    const cartItems = await cart.find();
    const detailedCart = [];

    for (let item of cartItems) {
      const bk = await book.findById(item.bookId);
      if (bk) {
        detailedCart.push({
          id: item._id,
          name: bk.name,
          price: bk.price,
          image: `/people/${bk.cover}`,
          quantity: item.quantity
        });
      }
    }

    res.status(200).json({ cart: detailedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// REMOVE from Cart
app.delete('/cartitems/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await cart.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove from cart" });
  }
});
// Remove from cart already exists: DELETE /cartitems/:id

// Add new order
// POST: Save Order
// Add new order
// Add new order
app.post('/addorder', async (req, res) => {
  const { name, price, buyerName, buyerEmail, buyerPhone, paymentType, feedback } = req.body;
  try {
      const newOrder = new OrdersCollection({
          name,
          price,
          buyerName,
          buyerEmail,
          buyerPhone,
          paymentType,
          feedback,
          date: new Date() ,// directly save Date object
          completed: false
      });
      await newOrder.save();
      res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error placing order" });
  }
});
app.patch('/orders/:id/complete', async (req, res) => {
  const orderId = req.params.id;
  try {
    await OrdersCollection.findByIdAndUpdate(orderId, { completed: true });
    res.json({ message: 'Order marked as completed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order' });
  }
});
// Fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await OrdersCollection.find({});
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Delete order by ID
app.delete('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    await OrdersCollection.findByIdAndDelete(orderId);
    res.json({ message: 'Order deleted (marked completed).' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting order' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port} or http://127.0.0.1:${port}`);
});
