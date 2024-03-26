import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./fs/files/users.json";
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

      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      users.push(user);

      await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
      console.log("Usuario creado");
    } catch (error) {
      console.log("Error al crear usuario:", error);
    }
  }
  async read(role = "0") {
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
      console.log(
        "IDs de los usuarios:",
        users.map((user) => user.id)
      ); // Imprime los IDs de los usuarios
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
      await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2)); // Corrección aquí
      console.log(id + " eliminado");
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
  await usersManager.readOne("2a1999332fc209ebc605e7d4");
}

async function testDestroy() {
  const usersManager = new UserManager();
  await usersManager.destroy("100ccf0b1ce449568a624e6e");
  console.log(await usersManager.readOne());
}

//testCreate();
//testRead();
//testReadOne();
//testDestroy();

const usersManager = new UserManager();
export default usersManager;
