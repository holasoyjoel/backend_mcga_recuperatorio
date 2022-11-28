const User = require("../models/Users");

const getUsers = async(req , res)=>{
    const usuarios = await User.find();
    res.status(200).json({
        error:false,
        usuarios: usuarios
    })
}

const getUser = async(req , res)=>{
   const {id} = req.params;
   const usuario = await User.find({id:id});
   if(usuario.length == 0){
       return res.status(403).json({error: true ,msg: `Id: ${id} no existente.`})
   }
   res.status(200).json({
    error: false,
    usuarios: usuario
   })
}

const postUser = async(req , res)=>{
    const {id,apellido,nombre,fechaNacimiento,dni,edad,nacionalidad,email,password} = req.body;

    const existeUsuario = await User.find({id:id});
    const existeEmail = await User.find({email:email});
    console.log(existeUsuario);
    if(existeUsuario.length > 0){
        return res.status(403).json({error: true ,msg: `Id: ${id} ya existente.`})
    }
    if(existeEmail.length > 0){
        return res.status(403).json({error: true ,msg: `Email: ${email} ya existente.`})
    }

    if(!id){
        return res.status(403).json({error: true ,msg: "Id es requerido."})
    }
    if(!apellido){
        return res.status(403).json({error: true ,msg: "Apellido es requerido."})
    }
    if(!nombre){
        return res.status(403).json({error: true ,msg: "Nombre es requerido."})
    }
    if(!fechaNacimiento){
        return res.status(403).json({error: true ,msg: "Fecha nacimiento es requerido."})
    }
    if(!dni){
        return res.status(403).json({error: true ,msg: "Dni nacimiento es requerido."})
    }
    if(!edad){
        return res.status(403).json({error: true ,msg: "Edad nacimiento es requerido."})
    }
    if(!nacionalidad){
        return res.status(403).json({error: true ,msg: "Nacionalidad nacimiento es requerido."})
    }
    if(!email){
        return res.status(403).json({error: true ,msg: "Email nacimiento es requerido"})
    }
    if(!password){
        return res.status(403).json({error: true ,msg: "Password nacimiento es requerido."})
    }

    const nuevoUsuario = new  User({id, apellido, nombre, fechaNacimiento, dni, edad, nacionalidad, email, password});

    await nuevoUsuario.save((err)=>{
        if(err){
            return res.status(403).json({error: true, msg: "Error en crear User"})
        }
        res.status(201).json({
            error:false,
            usuarios: nuevoUsuario
        })
    })
    
}

const putUser = async(req , res)=>{
    const {id:id_param} = req.params;
    const {id , email , ...resto} = req.body;
    
    const existeUsuario = await User.find({id:id_param});
    const existeEmail = await User.find({email:email});
    const existeIdIngresado = await User.find({id:id});


    if(existeUsuario.length == 0){
        return res.status(403).json({error: true ,msg: `Usuario a modificar: ${id} no existente.`})
    }
    
    if(existeIdIngresado.length > 0 && id_param != id){
        return res.status(403).json({error: true ,msg: `Id Ingresado: ${id} ya existente.`})
    }



    if(existeEmail.length > 0 && existeEmail[0].id != id_param){
        return res.status(403).json({error: true ,msg: `Email: ${email} ya existente.`})
    }

    resto.id = id;
    resto.email = email;

    const usuario = await User.findOneAndUpdate({id:id_param} , resto , {new:true});

    res.status(203).json({
        error: false,
        usuarios: usuario
    })
    
}

const patchUser = async(req, res)=>{
    const {id} = req.params;
    const existeUsuario = await User.find({id:id});

    if(existeUsuario.length == 0){
        return res.status(403).json({error: true ,msg: `Usuario a modificar: ${id} no existente.`})
    }

    let  usuario;
    for(const propiedad in req.body){
        
        console.log("propiedad", propiedad , " valor:" , req.body[propiedad]);
        usuario = await User.findOneAndUpdate({id:id} , {[propiedad]: req.body[propiedad]} , {new:true})
    }

    res.json({
        error: false,
        usuarios: usuario
    })
};


const deleteUser = async(req , res)=>{
    const {id} = req.params;
    const existeUsuario = await User.find({id:id});

    if(existeUsuario.length == 0){
        return res.status(403).json({error: true ,msg: `Usuario a modificar: ${id} no existente.`})
    }

    const usuario = await User.findOneAndDelete({id:id});
    
    res.status(200).json({
        error:false,
        msg: "usuario eliminado"
    })
 
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}