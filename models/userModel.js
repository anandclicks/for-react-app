const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb+srv://puspanand94:WHRcEvr2A5bDvma0@cluster0.8gcx0td.mongodb.net/").then(console.log('Databse has connected')).catch("Somehing is wrong databse has'nt cnnected...")
  // mongodb+srv://puspanand94:WHRcEvr2A5bDvma0@cluster0.8gcx0td.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
} catch (error) {
  console.log(error)
}

const userModel = mongoose.Schema({
  name : {
    type : String,
  },
  userName : {
    type : String
  },
  email : {
    type : String,
  },
  number : {
    type : Number,
  },
  password : {
    type : String,
  }
})
module.exports = mongoose.model("User", userModel)