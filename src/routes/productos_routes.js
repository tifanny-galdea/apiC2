import { Router } from "express";
import multer from 'multer'
import { storage } from '../cloudinary.js';

import { getProductos, postProductos, putProductos, patchProductos, deleteProductos, postProdu, getProductoID, buscarProductos } from "../controladores/productos_ctrl.js";

//configurar multer
const upload = multer({ storage });

const router = Router()

router.get('/productos', getProductos);
router.get('/productos/:id', getProductoID);
//router.post('/productos', postProductos);
router.post('/productos', upload.single('prod_imagen'), postProdu);
router.put('/productos/:id', putProductos);
router.patch('/productos/:id', upload.single('prod_imagen'), patchProductos);
router.delete('/productos/:id', deleteProductos);
router.get('/buscar-productos', buscarProductos);

export default router