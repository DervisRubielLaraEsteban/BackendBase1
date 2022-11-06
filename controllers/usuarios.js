const { request, response } = require("express");
const bcryptjs=require("bcryptjs")
const pool=require("../db/connection");
const modeloUsuario = require("../Models/usuarios");
const getUser = async(req=request,res=response)=>{
    let conn;

    try{
        conn = await pool.getConnection()
        const users = await conn.query(modeloUsuario.queryGetUsers[Usuario],(error)=>{throw new error})
        if(!users){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({users})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const getUserByID = async (req=request,res=response)=>{
    const {id}=req.params
    let conn;
    try{
        conn = await pool.getConnection()
        const [user] = await conn.query(modeloUsuario.queryGetUserByID [Usuario],(error)=>{throw new error})
        if(!user){
            res.status(404).json({msg:`No se encontró registro con el ID=${id}`})
            return
        }
        res.json({user})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deleteUserByID = async (req=request,res=response)=>{
    const {id}=req.query
    let conn;

    try{
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloUsuario.queryDeleteUserByID [Usuario],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo eliminar el registro con el ID=${id}`})
            return
        }
        res.json({msg:`El usuario con el ID=${id} se elimino correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
const addUser = async (req=request,res=response)=>{
    const {
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento ='1900-01-01',
        Activo
    }=req.body

    if(
        !Usuario||
        !Nombre||
        !Apellidos||
        !Edad||
        !Contrasena||
        !Activo
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloUsuario.queryUserExists, [Usuario])
        if(user){
            res.status(403).json({msg:`El usuario '${Usuario}' ya se encuentra registrado.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Contrasena,salt) 

        const {affectedRows} = await conn.query(modeloUsuario.queryAddUser [
              Usuario,
              Nombre,
              Apellidos,
              Edad,
              Genero || '',
              contrasenaCifrada,
              Fecha_Nacimiento,
              Activo
        ]
            ,(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg:`El usuario ${Usuario} se agregó correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const updateUserByUsuario = async (req=request,res=response)=>{
    const {
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento ='1900-01-01',
    }=req.body

    if(
        !Nombre||
        !Apellidos||
        !Edad||
        !Contrasena
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloUsuario.queryGetUserInfo,[Usuario])

        if(!user){
            res.status(403).json({msg:`El usuario '${Usuario}' no se encuentra registrado.`})
            return
        }
        const {affectedRows} = await conn.query(modeloUsuario.queryUpdateByUsuario, [
                Nombre || user.Nombre,
                Apellidos || user.Apellidos,
                Edad || user.Edad,
                Genero ||user.Genero,
                Fecha_Nacimiento,
                Usuario
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg:`El usuario ${Usuario} se actualizo correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}



const signIn = async (req=request,res=response)=>{
    const {
        Usuario,
        Contrasena
    }=req.body

    if(
        !Usuario||
        !Contrasena
    ){
        res.status(400).json({msg:"Falta información del usuario."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloUsuario.querySignIn, [Usuario])

        if(!user || user.Activo == 'N'){
            let code = !user ? 1: 2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos`,errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena,user.Contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos`,errorCode:"3"})
            return
        }


        res.json({msg:`El usuario ${Usuario} ha iniciado seción satisfactoriamenente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const ContraNueva = async (req=request,res=response)=>{
    const {
        Usuario,
        AntContra,
        NuvContra
    }=req.body

    if(
        !Usuario||
        !AntContra||
        !NuvContra
    ){
        res.status(400).json({msg:"Se necesitan mas datos para completar la tarea."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloUsuario.querySignIn, [Usuario])

        if(!user || user.Activo == 'N'){
            let code = !user ? 1: 2;
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos`,errorCode:code})
            return
        }

        const datosValidos = bcryptjs.compareSync(AntContra,user.Contrasena)

        if(!datosValidos){
            res.status(403).json({msg:`El usuario o la contraseña son incorrectos`,errorCode:"3"})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contraCifrada = bcryptjs.hashSync(NuvContra,salt) 

        const {affectedRows} = await conn.query(modeloUsuario.queryUpdatePassword,[
              contraCifrada,
              Usuario
            ],(error)=>{throw new error})
                if(affectedRows===0){
                  res.status(404).json({msg:`No se pudo actualizar la contraseña de ${Usuario}`})
                  return
             }
                   res.json({msg:`La contraseña de ${Usuario} se actualizo correctamente`})
                         }catch(error){
                           console.log(error)
                             res.status(500).json({error})
                         }finally{
                         if(conn){
                      conn.end()
        }
    }
}


module.exports={getUser,getUserByID,deleteUserByID,addUser,updateUserByUsuario,signIn,ContraNueva} 