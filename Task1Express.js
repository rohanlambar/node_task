
import express from 'express'

// creating a app as instance of express  
const app = express()

// serving static files using express 
app.use(express.static("public"))

//index.html file is first to served by server


// creating rounts for app server 
app.get('/',(req,res)=>{
    res.end("You are at home page");
})


app.get('/about',(req,res)=>{
    res.end("You are at about page");
})


app.get('/contact',(req,res)=>{
    res.end("You are at contact page");
})

// for invalid url 
app.use((req,res)=>{
    res.end('404 invalid url');
})

app.listen(8001,()=>console.log("express server listening at port number 8001"));
