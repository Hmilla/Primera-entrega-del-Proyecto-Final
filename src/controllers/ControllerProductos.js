const isNumber = require('is-number')
const Product = require('./Producto')

const Contenedor = new Product()

const getProductos = async (req, res) => {
    const verProductos= await Contenedor.getAll()
    res.json(verProductos)
}

 const postProductos = async (req, res) => {
    const {title, description, code, price, thumbnail, timestamp, stock} = req.body 

    const producto = await Contenedor.postnewProduct(title, description, code, price, thumbnail, timestamp, stock)
    res.json(producto)

}

const getIDProducto = async (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)){
        return res.json({ error: "el parámetro no es un numero" })
    }
    const producto = await Contenedor.getById(id)
    if(!producto.length){
        return res.status(404).json({error: "producto no encontrado"})
    }
    res.json(producto)
}


const putProducto = async (req, res) => {
    const {title, description, code, price, thumbnail, timestamp, stock} = req.body
    const id = Number(req.params.id)
    if(!isNumber(id)){
        return res.json({ error: "el parámetro no es un numero" })
    }
    const producto = await Contenedor.getById(id)
    if(!producto.length){
        return res.status(404).json({error: "producto no encontrado"})
    }

    const updatedProducto = await Contenedor.put(id, title, description, code, price, thumbnail, timestamp, stock)
    res.json(updatedProducto)
    
}
const deleteProducto = async (req, res) => {
    const id = Number(req.params.id)

    if(!isNumber(id)|| !id){
        return res.json({ error: "El parámetro no es un numero o el id no es correcto" })
    }
    await Contenedor.deleteById(id)

    res.json(await Contenedor.getAll())
}

module.exports = {
    getProductos,
    getIDProducto,
    postProductos,
    putProducto,
    deleteProducto,
    Contenedor
}

