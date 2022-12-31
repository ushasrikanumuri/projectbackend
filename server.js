const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const app = express();
const cors =require("cors")

const PORT = process.env.PORT || 3001;
mongoose.connect("mongodb+srv://Ushasri:Ushasri2003@cluster0.0kwhlk4.mongodb.net/bookstore?retryWrites=true&w=majority")
  .then(()=>{
    console.log("mongodb")
  }).catch((err)=>{
    console.log(err)
  })
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
//Allows us access to our DB cross-origin
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
})

app.use(express.static("client/build"));

// API and View routes
app.use(routes);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://Ushasri:Ushasri2003@cluster0.0kwhlk4.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
    
  .then(() => {
    console.log("Successfully connected to database.");
  })
  .catch((err) => {
    console.log("Unable to connect to database.");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
