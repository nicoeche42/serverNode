const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "./fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("archivo creado");
    } else {
      console.log("archivo ya existe");
    }
  }

  async create(data) {
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
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        users.push(product);
        console.log("Producto creado");
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      if (!products) {
        new Error("Error");
      } else {
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const product = products.find((each) => each.id === id);
      if (!product) {
        throw new Error("Producto inexistente");
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filtered = products.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("Id de producto inexistente");
      } else {
        await fs.promises.writeFile(filtered);
        console.log(id + "eliminado");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  const gestorDeProductos = new ProductManager();

  await gestorDeProductos.create({
    title: "remera",
    photo: "remera.jpg",
    category: "indumentaria",
    price: 50,
    stock: 200,
  });
  await gestorDeProductos.create({
    title: "zapatilla",
    photo: "zapatilla.jpg",
    category: "calzado",
    price: 300,
    stock: 50,
  });
  await gestorDeProductos.create({
    title: "buzo",
    photo: "buzo.jpg",
    category: "indumentaria",
    price: 200,
    stock: 100,
  });
  await gestorDeProductos.create({
    title: "zapato",
    photo: "zapato.jpg",
    category: "calzado",
    price: 250,
    stock: 20,
  });
  await gestorDeProductos.create({
    title: "pantalon",
    photo: "pantalon.jpg",
    category: "indumentaria",
    price: 150,
    stock: 40,
  });
  await gestorDeProductos.create({
    title: "camisa",
    photo: "camisa.jpg",
    category: "indumentaria",
    price: 100,
    stock: 100,
  });
  await gestorDeProductos.create({
    title: "ojotas",
    photo: "ojotas.jpg",
    category: "calzado",
    price: 50,
    stock: 200,
  });
  await gestorDeProductos.create({
    title: "gorra",
    photo: "gorra.jpg",
    category: "accesorios",
    price: 20,
    stock: 100,
  });
  await gestorDeProductos.create({
    title: "lentes",
    photo: "lentes.jpg",
    category: "accesorios",
    price: 30,
    stock: 80,
  });
  await gestorDeProductos.create({
    title: "medias",
    photo: "medias.jpg",
    category: "indumentaria",
    price: 15,
    stock: 40,
  });

  console.log(await gestorDeProductos.read());
}
test();
