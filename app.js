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

    res.redirect("/")
})

//for login user
app.post("/login", async (req, res)=>{
    const email = req.body.email
    const password = req.body.password

    //checking is email is exists or not
    const userExists = await users.findAll({
        where : {
            email : email
        }
    }) 

    if(userExists.length > 0){
        
        //checking now password
        const isMatch = bcrypt.compareSync(password,userExists[0].password)
       
        if(isMatch){
            res.send("Logged in successfully.")
        }else{
            res.send("Invalid password")
        }
    }else{
        res.send("Please enter correct email address")
    }
})


app.listen(3000,function(){
    console.log("NodeJS is running in port 3000")
})