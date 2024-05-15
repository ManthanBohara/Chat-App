const express = require("express")
const { connected } = require("process")
const { Socket } = require("socket.io")
const app = express()
const path = require("path")
const http = require("http").createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
path.join(__dirname+".."+"public")
app.use(express.static(path.join(__dirname,"..","public")))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","index.html"))
})
app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","about.html"))
})

// Socket

io = require("socket.io")(http)

io.on("connection",(socket)=>{
    console.log("connected");
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
    })
})
