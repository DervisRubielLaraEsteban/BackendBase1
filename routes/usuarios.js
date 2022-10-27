const {Router} = require("express")
const {getUsers, getUserbyID, userDeletedByID, addUser, updateUserByUsuario} = require("../controllers/usuarios")
const router = Router()

//AQUI SE DEFINE LA RUTA DE http://localhost:4000/api/v1/usuarios//

//GET//

router.get("/", getUsers)
router.get("/id/:id",getUserbyID)

//DELETE//

router.delete("/",userDeletedByID)

//POST//

router.post("/",addUser)

//PUT//

router.put("/",updateUserByUsuario)

module.exports = router