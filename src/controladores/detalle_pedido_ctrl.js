import { conmysql } from "../bd.js";

// PRESENTAR (get)
export const getDetallePedidos = async(req,res) => {
    try{
        const [result] = await conmysql.query('SELECT * FROM pedidos_detalle');
        res.json({
            data: result
        })
    }catch(error){
        return res.status(500).json({
            message: "Error en el Servidor"
        })
    }
} 

// INSERTAR NUEVO REGISTRO (post)
export const postDetallePedidos = async(req,res) => {
    try{
        //extraer los campos del cuerpo de la solicitud
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body;
        const [result] = await conmysql.query(
            'INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES  (?,?,?,?)',
            [ prod_id, ped_id, det_cantidad, det_precio ]
        )

        res.send({
            id: result.insertId
        })
    }catch (error){
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

// ACTUALIZAR TODOS LOS CAMPOS (put)
export const putDetallePedidos = async(req,res) =>{
    try{
        const { id } = req.params; //parametro de la URL
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body; //cuerpo de la solicitud
        const [result] = await conmysql.query(
            'UPDATE pedidos_detalle SET prod_id = ?, ped_id = ?, det_cantidad = ?, det_precio = ? WHERE det_id = ?',
            [prod_id, ped_id, det_cantidad, det_precio, id]
        )

        if(result.affectedRows<=0)return res.status(404).json({
            message: "Detalle Pedido no Encontrado"
        })

        const [row] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [req.params.id]) 
        res.json(row[0])

    }catch(error){
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

// ACTUALIZAR SOLO ALGUNOS CAMPO (patch)
export const patchDetallePedidos = async(req,res) =>{
    try{
        const { id } = req.params; //parametro de la URL
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body; //cuerpo de la solicitud
        const [result] = await conmysql.query(
            'UPDATE pedidos_detalle SET prod_id = IFNULL(?, prod_id), ped_id = IFNULL(?, ped_id), det_cantidad = IFNULL(?, det_cantidad), det_precio = IFNULL(?, det_precio) WHERE det_id = ?',
            [prod_id, ped_id, det_cantidad, det_precio, id]
        )

        if(result.affectedRows<=0)return res.status(404).json({
            message: "Detalle Pedido no Encontrado"
        })

        //mostrar clientes
        const [row] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [req.params.id]) 
        res.json(row[0])

    }catch(error){
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

// ELIMINAR (delete)
export const deleteDetallePedidos= async(req,res) =>{
    try{
        const [result] = await conmysql.query('DELETE FROM pedidos_detalle WHERE det_id=?', [req.params.id])
        if(result.length<=0)return res.status(400).json({
            det_id: 0,
            message: "Detalle Pedido no Encontrado"
        })
        res.sendStatus(204)
    }catch(error){
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}
