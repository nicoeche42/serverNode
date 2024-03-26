//import
import express from "express";
import productsManager from "./data/fs/ProductsManager.fs.js";
import usersManager from "./data/fs/UsersManager.fs.js";

//server
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

//middlewares
server.use(express.urlencoded({ extended: true }));

//router
server.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      response: "CODER API",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      response: null,
      message: "coder api error",
      success: false,
    });
  }
});

server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const all = await productsManager.read(category);
    if (all) {
      return res.status(200).json({
        response: all,
        codeStatus: 200,
        category,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: null,
      message: error.message,
      codeStatus: error.codeStatus,
      success: false,
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.readOne(pid);
    if (product) {
      return res.status(200).json({
        response: product,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query;
    const all = await usersManager.read(role);
    if (all) {
      return res.status(200).json({
        response: all,
        codeStatus: 200,
        role,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: null,
      message: error.message,
      codeStatus: error.codeStatus,
      success: false,
    });
  }
});

server.get("/api/products/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await usersManager.readOne(uid);
    if (user) {
      return res.status(200).json({
        response: user,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});
