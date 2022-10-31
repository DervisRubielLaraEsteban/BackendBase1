const {Router} = require("express")
<<<<<<< HEAD
const {getUser, getUserByID, deleteUserByID, addUser, updateUserByUsuario, singIn} = require("../controllers/usuarios")
=======
const {getUsers, getUserbyID, userDeletedByID, addUser, updateUserByUsuario} = require("../controllers/usuarios")
>>>>>>> 7fd5930451c52c165d43100213089118585a0c3d
const router = Router()

//http://localhost:4000/api/v1/usuarios

//GET
router.get("/", getUser)
router.get("/id/:id", getUserByID)

//DELETE
router.delete("/",deleteUserByID)

//POST
router.post("/",addUser)
router.post("/singIn",singIn)

//PUT
router.put("/",updateUserByUsuario)

//PUT//

router.put("/",updateUserByUsuario)

module.exports = router