class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      foto: data.foto,
      email: data.email,
      password: data.password,
      role: 0,
    };
    UserManager.#users.push(user);
    console.log("usuario creado");
  }
  read(){
    return UserManager.#users
  }
}

const gestorDeUsuarios = new UserManager()
gestorDeUsuarios.create({
    foto: "eve.jpg",
    email: "eve@gmail.com",
    password: "hola1234"
})
gestorDeUsuarios.create({
    foto: "nico.jpg",
    email: "nicoe@gmail.com",
    password: "jeje4321"
})

console.log(gestorDeUsuarios.read());

