const { request, response } = require("express");
const { query } = require("../db/connection");
const pool = require("../db/connection")

const getUsers = async(req = request, res = response) =>{
    let conn;
    
try {

    conn= await pool.getConnection()
    const users =  await conn.query("SELECT * FROM usuarios", (error) => {throw new Error(error)})

    if(!users){
        res.status(404).json({msg:"No se encontrarón registros"})
        return
    }
    res.json({users})
} catch (error){
    console.log(error)
    res.status(500).json({error})
}finally {
    if(conn){
        conn.end()
    }
}
}


const getUserbyID = async(req = request, res = response) =>{
    const {id} = req.params
    let conn;
//console.log("Función getUsers")
//res.json({msg: "Función getUsers"})

//CONTROL DE EXCEPSIONES//

try {

    conn= await pool.getConnection()

    const [user] = await conn.query(`SELECT * FROM usuarios WHERE ID = ${id}`, (error) => {throw new Error(error)})

    if(!user){
        res.status(404).json({msg:`No se encontraró registro con el ID ${id}`})
        return
    }
    res.json({user})
} catch (error){
    console.log(error)
    res.status(500).json({error})
} finally {
    if(conn){
        conn.end()
    }
}
}

/////

const userDeletedByID = async(req = request, res = response) =>{
    const {id} = req.query
    let conn;

try {

    conn= await pool.getConnection()

    const {affectedRows} = await conn.query(`UPDATE Usuarios SET Activo = 'N' WHERE ID = ${id}`, (error) => {throw new Error(error)})

    if(affectedRows === 0){
        res.status(404).json({msg:`No se pudo eliminar el registro con el ID ${id}`})
        return
    }
       res.json({msg:`El usuario con el ${id} se eliminó satisfactoriamente`})

      }     
      
      catch (error){
    console.log(error)
    res.status(500).json({error})
} finally {
    if(conn){
        conn.end()
    }
}
}
//1ra consulta de bases a end point

///

const addUser = async(req = request, res = response) =>{
    const{
        Usuarios,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento = '1900-01-01',
        Activo
    }= req.body
    
    if(
        !Usuarios || 
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Contrasena ||
        !Activo
    ){
        res.status(400).json({msg:"Falta información del usuario"})
        return
    }

    let conn;

try {

    conn= await pool.getConnection()

    const user = await conn.queary(`SELECT Usuario FROM Usuarios WHERE Usuario = '${Usuarios}'`)

    if (user){
        res.status(403).json({msg:` El usuario ${Usuarios} ya se encuentra registrado.`})
        return
    }


    const {affectedRows} = await conn.query(`
    
    INSERT INTO Usuarios (
        Usuarios,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento,
        Activo
    ) VALUES (
        '${Usuarios}',
        '${Nombre}',
        '${Apellidos}',
          ${Edad},
        '${Genero || 'Null'}',
        '${Contrasena}',
        '${Fecha_Nacimiento}',
        '${Activo}'
    )
    
    `, (error) => {throw new Error(error)})

    if(affectedRows === 0){
        res.status(404).json({msg:`No se pudo agregar el registro del usuario ${Usuarios}`})
        return
    }
       res.json({msg:`El usuario ${Usuarios} se agregó satisfactoriamente`})

      }     
      
      catch (error){
    console.log(error)
    res.status(500).json({error})
} finally {
    if(conn){
        conn.end()
    }
}
}
module.exports = {getUsers, getUserbyID, userDeletedByID, addUser}

/*
Genero ? chalala : nochalala //Operador Terniario
if(Genero){
    chalala
}else{
    nochalala
}
*/