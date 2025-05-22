import { Router } from "express";

import { getDetallePedidos, postDetallePedidos, putDetallePedidos, patchDetallePedidos, deleteDetallePedidos } from "../controladores/detalle_pedido_ctrl.js";

const router = Router()

router.get('/detalle-pedidos', getDetallePedidos);
router.post('/detalle-pedidos', postDetallePedidos);
router.put('/detalle-pedidos/:id', putDetallePedidos);
router.patch('/detalle-pedidos/:id', patchDetallePedidos);
router.delete('/detalle-pedidos/:id', deleteDetallePedidos);

export default router