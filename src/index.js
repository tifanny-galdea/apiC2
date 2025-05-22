
import app from './app.js'
import { port } from './config.js'

app.listen(port); //puerto 3000

console.log('El servidor está escuchando por el puerto: ', port)