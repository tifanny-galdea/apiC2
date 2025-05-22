import { Router } from "express";

import { getUsuarios, postUsuarios, putUsuarios, patchUsuarios, deleteUsuarios, getUsuarioID } from "../controladores/usuarios_ctrl.js";

const router = Router()

router.get('/usuarios', getUsuarios);
router.get('/productos/:id', getUsuarioID);
router.post('/usuarios', postUsuarios);
router.put('/usuarios/:id', putUsuarios);
router.patch('/usuarios/:id', patchUsuarios);
router.delete('/usuarios/:id', deleteUsuarios);



export default router