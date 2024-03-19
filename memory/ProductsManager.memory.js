const crypto = require("crypto");

class ProductManager {
  static #products = [];
  create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo:
          data.photo ||
          "https://static.vecteezy.com/system/resources/previews/007/409/979/non_2x/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      if (!data.stock || !data.title || !data.category || !data.price) {
        console.log("no creado, ingrese todos los datos requeridos");
      } else {
        ProductManager.#products.push(product);
        console.log("producto creado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      const products = ProductManager.#products;
      if (!products) {
        throw new Error("Error");
      } else {
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  }
  readOne(id) {
    try {
      const product = ProductManager.#products.find((each) => each.id === id);
      if (!product) {
        throw new Error("Producto inexistente");
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      const filtered = ProductManager.#products.filter(
        (each) => each.id !== id
      );
      if (!id) {
        throw new Error("Id de producto inexistente");
      } else {
        UserManager.#products = filtered;
        console.log(id + "eliminado");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeProductos = new ProductManager();
gestorDeProductos.create({
  title: "remera",
  photo: "remera.jpg",
  category: "indumentaria",
  price: 50,
  stock: 200,
});
gestorDeProductos.create({
  title: "zapatilla",
  photo: "zapatilla.jpg",
  category: "calzado",
  price: 300,
  stock: 50,
});
gestorDeProductos.create({
  title: "buzo",
  photo: "buzo.jpg",
  category: "indumentaria",
  price: 200,
  stock: 100,
});
gestorDeProductos.create({
  title: "zapato",
  photo: "zapato.jpg",
  category: "calzado",
  price: 250,
  stock: 20,
});
gestorDeProductos.create({
  title: "pantalon",
  photo: "pantalon.jpg",
  category: "indumentaria",
  price: 150,
  stock: 40,
});
gestorDeProductos.create({
    title: "camisa",
    photo: "camisa.jpg",
    category: "indumentaria",
    price: 100,
    stock: 100,
  });
  gestorDeProductos.create({
    title: "ojotas",
    photo: "ojotas.jpg",
    category: "calzado",
    price: 50,
    stock: 200,
  });
  gestorDeProductos.create({
    title: "gorra",
    photo: "gorra.jpg",
    category: "accesorios",
    price: 20,
    stock: 100,
  });
  gestorDeProductos.create({
    title: "lentes",
    photo: "lentes.jpg",
    category: "accesorios",
    price: 30,
    stock: 80,
  });
  gestorDeProductos.create({
    title: "medias",
    photo: "medias.jpg",
    category: "indumentaria",
    price: 15,
    stock: 40,
  });

console.log(gestorDeProductos.read());
