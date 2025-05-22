import { Router } from "express";
import { getClientes, getClientesID, postClientes, putClientes, patchClientes, deleteClientes } from "../controladores/clientes_ctrl.js";

const router = Router()

//armar rutas "URL"
router.get('/clientes', getClientes);
router.get('/clientes/:id', getClientesID);
router.post('/clientes', postClientes);
router.put('/clientes/:id', putClientes);
router.patch('/clientes/:id', patchClientes);
router.delete('/clientes/:id', deleteClientes);


export default router