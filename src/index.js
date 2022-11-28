require("dotenv").config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;
const conection_string = process.env.MONGO_CONNECT;
const app = express();
const mongoose = require('mongoose');
const routes = {
    users : "/users"
}

app.use(express.json());
app.use(cors());
app.use(routes.users , require('./routes/Users'));


mongoose.connect(conection_string ,(err)=>{
    if(err) throw new Error("problema al conectar Db");
    console.log("conexion a db establecida")
    
    app.listen(3001 , ()=>{
        console.log("Escuchando el puerto" , 3001);
    })
})

