class ProductManager {
  static #products = [];
  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
      photo: data.photo,
      title: data.title,
      category: data.category,
      price : data.price,
      stock : data.stock
    };
    ProductManager.#products.push(product);
    console.log("producto creado");
  }
  read(){
    return ProductManager.#products
  }
}

const gestorDeProductos = new ProductManager()
gestorDeProductos.create({
  title:"remera",
  photo: "remera.jpg",
  category: "indumentaria",
  price : 50,
  stock : 200
})
gestorDeProductos.create({
  title: "zapatilla",  
  photo: "zapatilla.jpg",
  category: "calzado",
  price : 300,
  stock : 50
})
gestorDeProductos.create({
  title: "buzo",  
  photo: "buzo.jpg",
  category: "indumentaria",
  price : 200,
  stock : 100
})
gestorDeProductos.create({
  title: "zapato",  
  photo: "zapato.jpg",
  category: "calzado",
  price : 250,
  stock : 20
})
gestorDeProductos.create({
  title: "pantalon",  
  photo: "pantalon.jpg",
  category: "indumentaria",
  price : 150,
  stock : 40
})

console.log(gestorDeProductos.read());

