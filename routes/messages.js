const {Router} = require("express")
 const router = Router()
   const {
    rootMessage, 
    hiMessage, 
    byMessage

} = require ('../controllers/messages') //Ir a un directorio arriba

 router.get("/", rootMessage)//End point

 router.get("/hi",hiMessage)//End point

 router.get('/bye',byMessage)//End point

 module.exports = router