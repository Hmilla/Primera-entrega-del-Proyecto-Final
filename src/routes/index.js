const { Router } = require('express');
const router = Router()
const { getProductos, postProductos, getIDProducto, putProducto,deleteProducto} = require('../controllers/ControllerProductos')
const {verCarrito, postCarrito, deleteCarrito,deleteProductoCarrito, insertProductoByIdToCart} = require('../controllers/ControllerCarrito')

//PRODUCTOS
router.get('/productos', getProductos)
router.get('/productos/:id', getIDProducto)


//CARRITO
router.post('/carrito', postCarrito) 
router.delete('/carrito/:id', deleteCarrito )
router.get('/carrito/:id/productos', verCarrito)

router.delete('/carrito/:id/productos/:id_prod', deleteProductoCarrito)
router.post('/carrito/:id/productos', insertProductoByIdToCart)

const auth = (req, res, next)=>{
    const admin = true
    if(admin) {
        return next()
    } 

    else {
        let err={
            error : "-1",
            descripcion: `ruta: ${req.url} metodo: ${req.method} no autorizado`
        }


        res.status(401).json(err)
    }
}
//ADMIN

router.post('/productos',auth  , postProductos)

router.delete('/productos/:id', auth , deleteProducto )
router.put('/productos/:id',auth  , putProducto)


module.exports = router