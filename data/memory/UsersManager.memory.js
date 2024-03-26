const crypto = require("crypto");

class UserManager {
  static #users = [];
  create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo:
          data.photo ||
          "https://static.vecteezy.com/system/resources/previews/007/409/979/non_2x/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg",
        email: data.email,
        password: data.password,
        role: data.role,
      };
      if (!data.email || !data.password || !data.role) {
        console.log("Usuario no creado. Ingrese todos los datos.");
      } else {
        UsersManager.#users.push(user);
        console.log("Usuario creado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      const users = UserManager.#users;
      if (!users) {
        throw new Error("Error");
      } else {
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#users.find((each) => each.id === id);
      if (!user) {
        throw new Error("Usuario inexistente");
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      const filtered = UserManager.#users.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("Id de usuario inexistente");
      } else {
        UserManager.#users = filtered;
        console.log(id + "eliminado");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const usersManager = new UserManager();

usersManager.create({
  photo: "eve.jpg",
  email: "eve@gmail.com",
  password: "jojo1234",
  role: "administrador",
});
usersManager.create({
  photo: "nico.jpg",
  email: "nicoe@gmail.com",
  password: "jeje4321",
  role: "usuario",
});
usersManager.create({
  photo: "martina.jpg",
  email: "martina@gmail.com",
  password: "jiji1234",
  role: "usuario",
});
usersManager.create({
  photo: "javier.jpg",
  email: "javier@gmail.com",
  password: "jaja4321",
  role: "usuario",
});

console.log(usersManager.read());
