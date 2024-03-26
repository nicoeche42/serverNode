import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./data/fs/files/users.json";
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
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo:
          data.photo ||
          "https://static.vecteezy.com/system/resources/previews/007/409/979/non_2x/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg",
        email: data.email,
        password: data.password,
        role: data.role || "0",
      };
      if (!data.email || !data.password || !data.role) {
        console.log("Usuario no creado. Ingrese todos los datos.");
      } else {
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("usuario creado");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read(rol = "0") {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      if (!users) {
        new Error("Error");
      } else {
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const user = users.find((each) => each.id === id);
      if (!user) {
        throw new Error("Usuario inexistente");
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const filtered = users.filter((each) => each.id !== id);
      await fs.promises.writeFile(filtered);
      console.log(id + "eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}

async function testCreate() {
  const usersManager = new UserManager();
  await usersManager.create({
    photo: "eve.jpg",
    email: "eve@gmail.com",
    password: "jojo1234",
    role: "administrador",
  });
  await usersManager.create({
    photo: "nico.jpg",
    email: "nicoe@gmail.com",
    password: "jeje4321",
    role: "usuario",
  });
  await usersManager.create({
    photo: "martina.jpg",
    email: "martina@gmail.com",
    password: "jiji1234",
    role: "usuario",
  });
  await usersManager.create({
    photo: "javier.jpg",
    email: "javier@gmail.com",
    password: "jaja4321",
    role: "usuario",
  });
  console.log(await usersManager.read());
}

async function testRead() {
  const usersManager = new UserManager();
  await usersManager.read();
  console.log(await usersManager.read());
}

async function testReadOne() {
  const usersManager = new UserManager();
  await usersManager.readOne("");
  console.log(await usersManager.readOne());
}

async function testDestroy() {
  const usersManager = new UserManager();
  await usersManager.destroy("");
  console.log(await usersManager.readOne());
}

testCreate();
testRead();
testReadOne();
testDestroy();

const usersManager = new UserManager();
export default usersManager;
