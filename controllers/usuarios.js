const { request, response } = require("express");

const getUsers = (req = request, res = response) =>{
console.log("Función getUsers")
res.json({msg: "Función getUsers"})
}

module.exports = {getUsers}