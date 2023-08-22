import fs from "fs"

class ProductManager{
    constructor(path){
        this.path = path
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path,JSON.stringify([]))
        }
    }

   async addProduct(product){
        try{
            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
                throw new Error("Todos los campos deben ser obligatorios")
            }else{
                let arrayProductos = fs.readFileSync(this.path,"utf-8")
                let productos = JSON.parse(arrayProductos)
                let id = productos.length + 1
                product.id = id
            }
            let arrProductos = fs.readFileSync(this.path,"utf-8")
            let productos = JSON.parse(arrProductos)
            productos.push(product)
            fs.writeFileSync(this.path,JSON.stringify(productos))
            console.log("Producto agregado")
        }catch(error){
            console.log(error)
        }
    }

    async getProductos(){
        try{
        let arrProductos = await fs.promises.readFile(this.path,"utf-8")
        let productos = JSON.parse(arrProductos)
        return productos
        }catch(error){
            return error
        }
    }

    async getProductById(id){
        try{
            let arrProductos = await fs.promises.readFile(this.path,"utf-8")
            let productos = JSON.parse(arrProductos)
            return productos.find((product)=>product.id===id) || "Not found"
            }catch(error){
            return error
        }
    }

    async updateProduct(id,campo,dato){
        try{
            let arrProductos = await fs.promises.readFile(this.path,"utf-8")
            let productos = JSON.parse(arrProductos)
            let productoIndice = productos.findIndex((product)=>product.id===id)
            if(productoIndice === -1){
                return new Error("Producto no encontrado")
            }else{
               productos[productoIndice][campo] = dato
               await fs.promises.writeFile(this.path,JSON.stringify(productos))
            }
            }catch(error){
            return error
        }
    }

    async deleteProduct(id){
        try{
        let arrProductos = await fs.promises.readFile(this.path,"utf-8")
        let productos = JSON.parse(arrProductos)
        let producto = productos.find((product)=>product.id===id)
        if(producto == undefined){
           console.log(new Error("Producto no encontrado"))
        }else{
            let newProductos = productos.filter((product)=>product.id!==producto.id)
            await fs.promises.writeFile(this.path,JSON.stringify(newProductos))
            console.log("Producto eliminado")
        }
        }catch(error){
            console.log(error)
        }
    }
}

let producto1 = {
    title : "Pantalon",
    description : "Pantalon cargo",
    price : 10000,
    thumbnail : "https://i.pinimg.com/474x/98/41/af/9841afaa84e9a0c9757e4a354612f786.jpg",
    code : "PANTALON1",
    stock : 100,
}

let producto2 = {
    title : "Buzo",
    description : "Buzo carthat",
    price : 20000,
    thumbnail : "https://i.pinimg.com/236x/89/99/ca/8999ca96d9f254d1a5411c59d0e4bff7.jpg",
    code : "BUZO1",
    stock : 50
}

let producto3 = {
    title : "Remera ",
    description : "Remera vintage",
    price : 15000,
    thumbnail : "https://i.pinimg.com/236x/d8/51/93/d85193279a976d9da781716380761b92.jpg",
    code : "REMERA1",
    stock : 90
}

const manager = new ProductManager("productos.json")

manager.addProduct(producto1)
manager.addProduct(producto2)
manager.addProduct(producto3)




export default ProductManager