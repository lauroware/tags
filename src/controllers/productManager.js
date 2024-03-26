import {
  serviceGetProductById,
  serviceGetProducts,
  serviceUpdateProduct,
  serviceProductsCreatedBy,
} from "../services/product.js";
import { userModel } from "../models/users.model.js";

import { productModel } from "../models/products.model.js";

const isUserAdmin = (user) => {
  return user && user.role === "admin";
};

const isUserPremium = (user) => {
  return user && user.role === "premium";
};

const getProducts = async (req, res) => {
  let user = req.session.user;
  try {
    const products = await serviceGetProducts(req.query);
    let isAdmin = isUserAdmin(user);
    let isPremium = isUserPremium(user);
    const hasNextPage = products.hasNextPage;
    const hasPrevPage = products.hasPrevPage;
    const sort = products.sort;
    const page = products.page;
    const query = products.query;
    const allCategories = products.docs.map((element) => element.category);
    const categories = allCategories.filter(
      (element, index, self) => self.indexOf(element) === index
    );
    res.status(200).render("home", {
      title: "Products",
      style: "index.css",
      products,
      hasNextPage,
      hasPrevPage,
      sort,
      page,
      query,
      categories,
      user,
      isPremium,
      isAdmin,
    });
  } catch (error) {
    res.status(500).send({ message: "Error trying to get all products" });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.pid;
  let user = req.session.user;

  try {
    // Obtener los detalles del producto
    let product = await serviceGetProductById(id);

    // Agregar un console.log para verificar los datos del producto
    console.log("Datos del producto:", product);

    // Verificar si el usuario es administrador o premium
    let isAdmin = isUserAdmin(user);
    let isPremium = isUserPremium(user);

    // Renderizar la plantilla con los datos del producto y otras variables
    res.render("details", {
      product,
      user,
      isAdmin,
      isPremium,
      title: "Products",
      style: "index.css",
    });
  } catch (error) {
    res.status(500).send({ message: "Error trying to get a product by id" });
  }
};

const getProductsFromPremiumUsers = async (req, res) => {
  let user = req.session.user;
  try {
    let allProducts = await serviceProductsCreatedBy(user._id);
    let isPremium = isUserPremium(user);
    res.render("premiumUser", {
      user,
      isPremium,
      allProducts,
      style: "index.css",
    });
  } catch (error) {
    res.status(500).send({ message: "Error trying to get a product by id" });
  }
};

const updateProduct = async (req, res) => {
  const { pid, updates } = req.body;
  try {
    const result = await serviceUpdateProduct(pid, updates);
    if (result.status === "error") {
      res.status(404).send({ message: result.payload });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating the product" });
  }
};

const getAdminView = async (req, res) => {
  try {
    const idUsuario = req.usuario.id;
    const products = await productModel.find({ createdBy: idUsuario });
    console.log(products); // Verifica los datos que estás enviando
    res.render("adminView", { products });
  } catch (error) {
    console.error("Error al obtener los productos del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export {
  getProducts,
  getProductById,
  updateProduct,
  getProductsFromPremiumUsers,
  getAdminView,
};
