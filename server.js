const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoute = require("./routes/paymentRoute")
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: ["http://localhost:3003", "https://emprestimo-frontend.vercel.app", "emprestimo-frontend.vercel.app"],
//   })
// );

app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "http://finaceiro.nodejsng10f06.kinghost.net"); 
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true);
  app.use(cors());
  next();
  });


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Hello Word");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server Running`);
    });
  })
  .catch((err) => console.log(err));
