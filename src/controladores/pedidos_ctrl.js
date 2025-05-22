import { conmysql } from "../bd.js"; //importar la conexion a la base

// Objetos de Express |
// req(solicitud // parametros de URL [.params.id], datos [.body])
// res(respuesta // se puede enviar un texto con .send(), un .json(), o .status())

// PRESENTAR (get)
export const getPedidos = async(req,res) => {
    try{
        const [result] = await conmysql.query('SELECT * FROM pedidos');
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
export const postPedidos = async(req,res) => {
    try{
        //extraer los campos del cuerpo de la solicitud
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;
        const [result] = await conmysql.query(
            'INSERT INTO pedidos(cli_id, ped_fecha, usr_id, ped_estado) VALUES (?,?,?,?)',
            [ cli_id, ped_fecha, usr_id, ped_estado ]
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
export const putPedidos = async(req,res) =>{
    try{
        const { id } = req.params; //parametro de la URL
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body; //cuerpo de la solicitud
        const [result] = await conmysql.query(
            'UPDATE pedidos SET cli_id = ?, ped_fecha = ?, usr_id = ?, ped_estado = ? WHERE ped_id = ?',
            [cli_id, ped_fecha, usr_id, ped_estado, id]
        )

        if(result.affectedRows<=0)return res.status(404).json({
            message: "Pedido no Encontrado"
        })

        //mostrar clientes
        const [row] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [req.params.id]) 
        res.json(row[0])

    }catch(error){
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

// ACTUALIZAR SOLO ALGUNOS CAMPO (patch)
export const patchPedidos = async(req,res) =>{
    try{
        const { id } = req.params; //parametro de la URL
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body; //cuerpo de la solicitud
        const [result] = await conmysql.query(
            'UPDATE pedidos SET cli_id = IFNULL(?, cli_id), ped_fecha = IFNULL(?, ped_fecha), usr_id = IFNULL(?, usr_id), ped_estado = IFNULL(?, ped_estado) WHERE ped_id = ?',
            [cli_id, ped_fecha, usr_id, ped_estado, id]
        )

        if(result.affectedRows<=0)return res.status(404).json({
            message: "Pedido no Encontrado"
        })

        const [row] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [req.params.id]) 
        res.json(row[0])

    }catch(error){
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

// ELIMINAR (delete)
export const deletePedidos= async(req,res) =>{
    try{
        const [result] = await conmysql.query('DELETE FROM pedidos WHERE ped_id=?', [req.params.id])
        if(result.length<=0)return res.status(400).json({
            ped_id: 0,
            message: "Pedido no Encontrado"
        })
        res.sendStatus(204)
    }catch(error){
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}
