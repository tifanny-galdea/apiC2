import { Router } from "express";
import multer from 'multer'

import { getProductos, postProductos, putProductos, patchProductos, deleteProductos, postProdu, getProductoID } from "../controladores/productos_ctrl.js";

//configurar multer
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads'); //carpeta donde están las imagenes
    },
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}-${(file.originalname)}`);
    }
})

const upload = multer({ storage })
const router = Router()

router.get('/productos', getProductos);
router.get('/productos/:id', getProductoID);
//router.post('/productos', postProductos);
router.post('/productos', upload.single('prod_imagen'), postProdu);
router.put('/productos/:id', putProductos);
router.patch('/productos/:id', patchProductos);
router.delete('/productos/:id', deleteProductos);

export default router