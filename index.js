const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const pokemonRoutes = require("./routes/pokemon")

const app = express()
const port = 3000

app.set("port",port)
//Esta línea es muy importante porque nos permite interactuar con los JSON que enviamos, sin esta línea no sabemos trabajar con JSON
app.use(express.json())
app.use(cors())

Rutas
   app.get("/",(req,res)=>{
        res.send("Hola entrenador")
})

app.use("/api/pokemon",pokemonRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(console.log("Conect to DB"))
    .catch((err)=>console.error(err.message))

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})