const express = require('express') 

class Server{
    constructor(){
      this.app = express()
      this.routes()
    }

routes(){
    this.app.get('/', (req, res) => {
        res.send('Hello World')
    })
}

listen(){
    this.app.listen(process.env.PORT,() => { //Poner un this aqui xd//
        console.log("Backend en ejecución en el puerto", process.env.PORT)
})
}
}

module.exports = Server
