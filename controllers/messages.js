const { request, response } = require("express")

const rootMessage = (req=request, res=response) => {
    res.status(404).json({msg:'Mensajes'})
}
/*PROBAR UN STATUS EN CADA UNA DE ELLAS: res.status(número del error).json*/
const hiMessage =(req=request, res=response) => {
    res.status(405).json({msg:'Hola Mundo'})
}

const byMessage = (req=request, res=response) => {
    res.status(406).json({msg:'Adios Mundo'})
}

const postMessage = (req=request, res=response) => {
    res.status(407).json({msg:'Mensaje POST'})
}

const putMessage = (req=request, res=response) => {
    res.status(408).json({msg:'Mensaje PUT'})
}

const deleteMessage = (req=request, res=response) => {
    res.status(409).json({msg:'Mensaje DELETE'})
}

    module.exports = {rootMessage, hiMessage, byMessage, postMessage, putMessage, deleteMessage}