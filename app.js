const express = require("express")
const { users } = require("./model/index")
const app = express()

//for hashing passwords
const bcrypt = require("bcryptjs")

//for using ejs engine
app.set("view engine", "ejs")


// database connection 
require("./model/index")

// for parse incoming form data
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res)=>{
    res.render("login")
})

app.get("/register", (req, res)=>{
    res.render("register")
})

// post api for handling user registration
app.post("/register", async (req,res)=>{
    console.log(req.body)
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    if(!email || !username || !password){
        return res.send("Please provide email, username and password")
    }

    await users.create({
        email : email,
        username : username,
        password : bcrypt.hashSync(password,8)
    })

    res.send("user registered successfully")
})


app.listen(3000,function(){
    console.log("NodeJS is running in port 3000")
})