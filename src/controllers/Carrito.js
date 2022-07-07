const {read, write}= require ('../persistencia/persistencia')

class CarritoContainer{
    constructor(){
        this.carritos= [];
    }
   
    async getCartById(id){
        this.carritos = await read('Carritos')
        const carrito = this.carritos.filter(carrito=> carrito.id === id)
        return carrito   
    }
    async getAllCarts(){
        this.carritos = await read('Carritos')
        return this.carritos
    }
    async deleteCartById(id){
        this.carritos = await read('Carritos')
        const objeto = this.carritos.filter(item=>item.id!=id)
        this.carritos = objeto 
        await write('Carritos',this.carritos)  
    }
    async deleteProductoCartById(id,id_prod){
        this.carritos = await read('Carritos')
        const index=this.carritos.findIndex(carrito=>carrito.id==id)
        const newCarritos= this.carritos[index].products.filter(item=>item.id!=id_prod)
        this.carritos[index].products=newCarritos
        await write('Carritos',this.carritos) 
    }
    async insertProductById(id,productInsert){
        this.carritos = await read('Carritos')
        const index=this.carritos.findIndex(carrito=>carrito.id==id)
        this.carritos[index].products.push(productInsert)
        await write('Carritos',this.carritos)  
    }

    async newCart(){
        this.carritos = await read('Carritos')
        if(this.carritos.length==0){
            const carrito = {
                timestamp:Date.now(), 
                id:1,
                products:[]
            }
            this.carritos.push(carrito)
            await write('Carritos',this.carritos)
            return carrito
        }else{
           const lastIndex = this.carritos[this.carritos.length-1].id
           const Index= lastIndex + 1
           const carrito = {
            timestamp:Date.now(),
            id:Index,
            products:[]
            }
            this.carritos.push(carrito)
            await write('Carritos',this.carritos)
            return carrito
        }
    }

}

module.exports= CarritoContainer