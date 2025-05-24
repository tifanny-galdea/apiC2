import { conmysql } from "../bd.js";

export const obtenerClientes=(req,res) =>{
    res.send('Lista de Clientes')
}

export const getClientes= async(req,res) =>{
    try{
        const [result] = await conmysql.query('SELECT * FROM clientes WHERE cli_estado = "A"')
        res.json({
            cant:result.length, data:result
        })
    }catch(error){
        return res.status(500).json({message:" error en el servidor"})
    }
}

//retorna cliente por ID
export const getClientesID= async(req,res) =>{
    try{
        //const miID = req.params.id;
        const [result] = await conmysql.query('Select * from clientes where cli_id=?', [req.params.id])
        if(result.length<=0)return res.status(400).json({
            cli_id: 0,
            message: "Cliente no Encontrado"
        })
        res.json(result[0])
    }catch(error){
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const postClientes= async(req,res) =>{
    try {
        const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad} = req.body;
        console.log(req.body);
        const [result] = await conmysql.query('INSERT INTO clientes(cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, cli_estado) VALUES (?, ?, ?, ?, ?, ?, ?, A)',
        [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad])
        res.send({
            cli_id: result.insertId
        })
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const putClientes= async(req,res) =>{
    try {
        const {id} = req.params;
        const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad} = req.body;
        const [result] = await conmysql.query('UPDATE clientes SET cli_identificacion = ?, cli_nombre = ?, cli_telefono = ?, cli_correo = ?, cli_direccion = ?, cli_pais = ?, cli_ciudad = ? WHERE cli_id = ?',
        [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id])
        
        if(result.affectedRows<=0)return res.status(404).json({
            message: "Cliente no Encontrado"
        })
        
        const [row] = await conmysql.query('Select * from clientes where cli_id=?', [req.params.id])
        res.json(row[0])
        
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}


export const patchClientes= async(req,res) =>{
    try {
        const {id} = req.params;
        const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, cli_estado} = req.body;
        const [result] = await conmysql.query('UPDATE clientes SET cli_identificacion = IFNULL(?, cli_identificacion), cli_nombre = IFNULL(?, cli_nombre), cli_telefono = IFNULL(?, cli_telefono), cli_correo = IFNULL(?, cli_correo), cli_direccion = IFNULL(?, cli_direccion), cli_pais = IFNULL(?, cli_pais), cli_ciudad = IFNULL(?, cli_ciudad), cli_estado = IFNULL(?, cli_estado) WHERE cli_id = ?',
        [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, cli_estado, id])
        
        if(result.affectedRows<=0)return res.status(404).json({
            message: "Cliente no Encontrado"
        })
        
        const [row] = await conmysql.query('Select * from clientes where cli_id=?', [req.params.id])
        res.json(row[0])
        
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

export const deleteClientes= async(req,res) =>{
    try{
        //const miID = req.params.id;
        const [result] = await conmysql.query('DELETE FROM clientes where cli_id=?', [req.params.id])
        if(result.length<=0)return res.status(400).json({
            cli_id: 0,
            message: "Cliente no Encontrado"
        })
        res.sendStatus(204)
    }catch(error){
        return res.status(500).json({message:" error en el servidor"})
    }
}