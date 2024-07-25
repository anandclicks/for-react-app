const exprss = require("express")
const app = exprss()
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const cors = require('cors')
app.use(cors({
  origin: ' http://localhost:5173',
  credentials: true 
}))

app.use(exprss.json());
const secreateKey = "jaskdfgaishfdjksbafdksd"
const userModel = require("./models/userModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
app.get('/',(req,res)=> {
  res.json("working fine")
})
app.post("/register",(req,res)=> {
  const {name,userName, email, number, password} = req.body
  bcrypt.genSalt(10,(err,salt)=> {
    bcrypt.hash(password, salt, async(err, hasedPass)=> {
      const newUser = await userModel.create({
        name,
        email,
        userName,
        number,
        password : hasedPass
       })
       res.send(true)
    })
  })

})

app.post('/login',async (req,res)=> {
  const {email,password} = req.body
  const userExistOrNot = await userModel.findOne({email})
  if(!userExistOrNot) {
    return res.json(false)
  }
  else {
    const passOk = await bcrypt.compare(password, userExistOrNot.password)
    console.log(passOk)
    if(passOk) {
      let cookie = jwt.sign({ email: email, name : userExistOrNot.name }, secreateKey)
      res.cookie("Token", cookie ).send(true)
      console.log(cookie)
    }
    else {
      res.json(false)
    }
  }
})

app.get('/userverify',(req,res)=> {
 console.log(req.cookies)
 let Token = req.cookies.Token
 if(!Token) {
  return res.status(404).send(false)
 }
 else {
  let data = jwt.verify(Token,secreateKey)
  console.log(data)
  res.json(data)
 }
})

app.get('/logout',(req,res)=> {
  res.cookie('Token', '').send("Logout successfully..")
})
