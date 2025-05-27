import express from 'express'
import cors from 'cors'

//subir imagenes
import path from 'path'
import { fileURLToPath } from 'url'

//importar las rutas
import clientesRoutes from './routes/clientes_routes.js'
import pedidosRoutes from './routes/pedidos_routes.js'
import detallePedidoRoutes from './routes/detalle_pedido_routes.js'
import productosRoutes from './routes/productos_routes.js'
import usuariosRoutes from './routes/usuarios_routes.js'

//definir móulos de entrada
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//definir permisos
const corsOptions = {
  origin: '*', // permitir todas las peticiones, al menos para test
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json()); //interpreta objetos json
app.use(express.urlencoded({extended: true})) //receptar formularios
app.use('/uploads', express.static(path.join(__dirname,'../uploads'))) //direccionar donde quiere guardar la info

//indicar que rutas se utiliza
app.use('/api', clientesRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', detallePedidoRoutes);
app.use('/api', productosRoutes);
app.use('/api', usuariosRoutes);


app.use((req,resp,next) =>{
    resp.status(400).json({
        message: 'Endponit not found'
    })
}
)

export default app;