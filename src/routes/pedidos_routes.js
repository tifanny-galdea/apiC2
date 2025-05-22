import { Router } from "express";

import { getPedidos, postPedidos, putPedidos, patchPedidos, deletePedidos } from "../controladores/pedidos_ctrl.js";

const router = Router()

router.get('/pedidos', getPedidos);
router.post('/pedidos', postPedidos);
router.put('/pedidos/:id', putPedidos);
router.patch('/pedidos/:id', patchPedidos);
router.delete('/pedidos/:id', deletePedidos);

export default router