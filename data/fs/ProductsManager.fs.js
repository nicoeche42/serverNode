import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
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
      if (!data.title) {
        throw new Error("ingrese titulo");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          category: data.category || "to do",
          date: data.date || new Date(),
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(product);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        console.log({ created: product.id });
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read(cat = "to do") {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      all = all.filter((each) => each.category === cat);
      if (all.length === 0) {
        return null;
      } else {
        console.log(all);
        return all;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let product = all.find((each) => each.id === id);
      if (!product) {
        throw new Error(" no encontrado");
      } else {
        console.log(product);
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let product = all.find((each) => each.id === id);
      if (!product) {
        throw new Error("no encontrado");
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: product.id });
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function testCreate() {
  const productsManager = new ProductManager();
  productsManager.create({
    title: "remera",
    photo: "remera.jpg",
    category: "indumentaria",
    price: 50,
    stock: 200,
  });
  productsManager.create({
    title: "zapatilla",
    photo: "zapatilla.jpg",
    category: "calzado",
    price: 300,
    stock: 50,
  });
  productsManager.create({
    title: "buzo",
    photo: "buzo.jpg",
    category: "indumentaria",
    price: 200,
    stock: 100,
  });
  productsManager.create({
    title: "zapato",
    photo: "zapato.jpg",
    category: "calzado",
    price: 250,
    stock: 20,
  });
  productsManager.create({
    title: "pantalon",
    photo: "pantalon.jpg",
    category: "indumentaria",
    price: 150,
    stock: 40,
  });
  productsManager.create({
    title: "camisa",
    photo: "camisa.jpg",
    category: "indumentaria",
    price: 100,
    stock: 100,
  });
  productsManager.create({
    title: "ojotas",
    photo: "ojotas.jpg",
    category: "calzado",
    price: 50,
    stock: 200,
  });
  productsManager.create({
    title: "gorra",
    photo: "gorra.jpg",
    category: "accesorios",
    price: 20,
    stock: 100,
  });
  productsManager.create({
    title: "lentes",
    photo: "lentes.jpg",
    category: "accesorios",
    price: 30,
    stock: 80,
  });
  productsManager.create({
    title: "medias",
    photo: "medias.jpg",
    category: "indumentaria",
    price: 15,
    stock: 40,
  });
  productsManager.create({
    title: "chomba",
    photo: "chomba.jpg",
    category: "indumentaria",
    price: 150,
    stock: 100,
  });
  productsManager.create({
    title: "borcego",
    photo: "borcego.jpg",
    category: "calzado",
    price: 200,
    stock: 150,
  });
  productsManager.create({
    title: "chaleco",
    photo: "chaleco.jpg",
    category: "indumentaria",
    price: 300,
    stock: 50,
  });
  productsManager.create({
    title: "botas",
    photo: "botas.jpg",
    category: "calzado",
    price: 350,
    stock: 10,
  });
  productsManager.create({
    title: "short",
    photo: "short.jpg",
    category: "indumentaria",
    price: 100,
    stock: 140,
  });
  productsManager.create({
    title: "musculosa",
    photo: "musculosa.jpg",
    category: "indumentaria",
    price: 120,
    stock: 80,
  });
  productsManager.create({
    title: "tacos",
    photo: "tacos.jpg",
    category: "calzado",
    price: 170,
    stock: 50,
  });
  productsManager.create({
    title: "corbata",
    photo: "corbata.jpg",
    category: "accesorios",
    price: 50,
    stock: 100,
  });
  productsManager.create({
    title: "pulcera",
    photo: "pulcera.jpg",
    category: "accesorios",
    price: 30,
    stock: 80,
  });
  productsManager.create({
    title: "pollera",
    photo: "pollera.jpg",
    category: "indumentaria",
    price: 50,
    stock: 140,
  });
  console.log(await productsManager.read());
}

async function testRead() {
  const productsManager = new ProductManager();
  await productsManager.read();
  console.log(await productsManager.read());
}

async function testReadOne() {
  const productsManager = new ProductManager();
  await productsManager.readOne("");
  console.log(await productsManager.readOne());
}

async function testDestroy() {
  const productsManager = new ProductManager();
  await productsManager.destroy("");
  console.log(await productsManager.destroy());
}

testCreate();
//testRead();
//testReadOne();
//testDestroy();

const productsManager = new ProductManager();
export default productsManager;
