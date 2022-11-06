const modeloUsuario = {
   queryGetUsers: "SELECT * FROM usuarios",

   queryGetUserByID : `SELECT * FROM usuarios WHERE ID= ?`,

   queryDeleteUserByID: `UPDATE usuarios SET Activo='N' WHERE ID= ?`,

   queryUserExists: `SELECT Usuario FROM usuarios WHERE Usuario = ?`,

   queryAddUser: `
            INSERT INTO usuarios(
                Usuario,
                Nombre,
                Apellidos,
                Edad,
                Genero,
                Contrasena,
                Fecha_Nacimiento,
                Activo
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?'
            )
            `, 
   queryGetUserInfo:`
   SELECT Usuario Nombre, Apellidos, Edad, Genero, Fecha_Nacimiento
   FROM usuarios
   WHERE Usuario =?
   `,

   queryUpdateByUsuario:`
   UPDATE usuarios SET
       Nombre = ?,
       Apellidos= ?,
       Edad= ?,
       Genero= ?,
       Fecha_Nacimiento= ?'
   WHERE Usuario= ?'
   `,
   querySignIn: `SELECT Usuario, Contrasena, Activo FROM usuarios WHERE Usuario = ?`,
    
   queryUpdatePassword: `
   UPDATE usuarios SET
       Contrasena = ?
   WHERE Usuario= ?
   `
}
   
module.exports = modeloUsuario