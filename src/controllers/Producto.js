const {read, write}= require ('../persistencia/persistencia')

class Products{
    constructor(){
        this.productos= [];
    }
   
    async getById(id){
        this.productos = await read('Productos')
        const producto = this.productos.filter(producto=> producto.id === id)
        return producto   
    }
    async getAll(){
        this.productos = await read('Productos')
        return this.productos
    }
    async deleteById(id){
        this.productos = await read('Productos')
        const objeto = this.productos.filter(item=>item.id!=id)
        this.productos = objeto 
        await write('Productos',this.productos) 
    }
    
    async put(id, title, description, code, price, thumbnail, timestamp, stock){
        this.productos = await read('Productos')
        const index=this.productos.findIndex(producto=>producto.id==id)
        this.productos[index].title=title

        this.productos[index].price=price
        this.productos[index].thumbnail=thumbnail
        this.productos[index].description=description
        this.productos[index].code=code
        this.productos[index].stock=stock
        this.productos[index].timestamp=timestamp
        await write('Productos',this.productos)   
    }
    async postnewProduct(title, description, code, price, thumbnail, stock){
        this.productos = await read('Productos')
        if(this.productos.length==0){
            const producto = {
                title,
                price,
                thumbnail,
                description, 
                code,
                timestamp:Date.now(), 
                stock,
                id:1
            }
            this.productos.push(producto)
            await write('Productos',this.productos)
            return producto
        }else{
           const lastIndex = this.productos[this.productos.length-1].id
           const Index= lastIndex + 1
           const producto = {
            title,
            price,
            thumbnail,
            description, 
            code,
            timestamp:Date.now(),
            stock,
            id:Index
            }
            this.productos.push(producto)
            await write('Productos',this.productos)
            return producto
        }
    }

}

module.exports= Products