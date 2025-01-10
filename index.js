const app = require('./app')

let port = 4000;

app.listen(port,()=>{
    console.log("Server running port on: "+port)
})