import {
  serviceGetAllUsers,
  serviceGetUserByTag,
  serviceLoginUser,
  serviceDeleteAllUsers,
  serviceDeleteUserById,
  serviceUpdateUserRole,
  serviceUpdateUserEmail,
  serviceRestorePassword,
  serviceGetUserByEmail,
} from "../services/auth.js";
import { serviceProductsFromDTO } from "../services/product.js";
import { serviceGetPetByUserId } from "../services/product.js";
import { isValidPassword } from "../utils/index.js";
import transporter from "../utils/mail.js";
import { userModel } from "../models/users.model.js";
import { GMAIL } from "../config/index.config.js";
import { v4 } from "uuid";
import {
  serviceCreateToken,
  serviceDeleteTokenById,
  serviceFindTokenByUserId,
} from "../services/token.js";

const loginForm = (req, res) => {
  res.render("login", { title: "Login", style: "index.css" });
};

const login = async (req, res) => {
  try {
    const user = await serviceGetUserByTag(req.body.tag); // Cambiar a la función que busca usuarios por número de tag

    if (!user) {
      res
        .status(404)
        .send({ status: "error", payload: "Usuario no encontrado" });
      return;
    }

    const validPassword = isValidPassword(user, req.body.password);
    if (!validPassword) {
      res
        .status(401)
        .send({ status: "error", payload: "Contraseña incorrecta" });
      return;
    }

    const userDate = await userModel.findOneAndUpdate(
      { tag: user.tag }, // Cambiar el campo de búsqueda a número de tag
      { lastLoginDate: new Date() },
      { new: true }
    );

    req.session.user = user;
    const response = {
      status: "success",
      payload: {
        message: "Inicio de sesión exitoso",
        userDate: userDate,
      },
      redirectTo: "/api/products",
    };
    res.send(response);
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).send({ status: "error", payload: "Error en el servidor" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await serviceGetAllUsers();
    res
      .status(200)
      .send({ status: "success", payload: "All users found", allUsers });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", payload: "Error finding all users" });
  }
};

const updateUserRole = async (req, res) => {
  const { uid, newRole } = req.body;
  try {
    const updatedUser = await serviceUpdateUserRole(uid, newRole);
    res.status(200).send({
      status: "success",
      payload: "User role updated",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", payload: "Error updating user role" });
  }
};

const updateUserEmail = async (req, res) => {
  const { uid, newEmail } = req.body;
  try {
    const updatedUser = await serviceUpdateUserEmail(uid, newEmail);
    res.status(200).send({
      status: "success",
      payload: "User email updated",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", payload: "Error updating user role" });
  }
};

const renderRestorePassword = async (req, res) => {
  res.render("restore-password", { style: "index.css" });
};

const restorePassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const tokenReset = await serviceFindTokenByUserId(email);
    if (tokenReset.token !== code || tokenReset.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ message: "Código de restablecimiento inválido o vencido" });
    }

    const updatedUser = await serviceRestorePassword(email, newPassword);

    await serviceDeleteTokenById(tokenReset._id);
    res.status(200).send({
      status: "success",
      payload: "User password updated",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", payload: "Error updating user password" });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await serviceDeleteAllUsers();
    res.status(200).send({ status: "success", payload: "All users deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", payload: "Error deleting all users" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    let uid = req.params.uid;
    if (!uid) {
      res.status(404).send({ status: "error", payload: "User not found" });
    } else {
      await serviceDeleteUserById(uid);
      res.status(200).send({ status: "success", payload: "User deleted" });
    }
  } catch (error) {
    res.status(500).send({ status: "error", payload: "Error deleting user" });
  }
};

const isUserAdmin = (user) => {
  return user && user.role === "admin";
};

const isUserAdmin1 = (user) => {
  return user && user.role === "admin1";
};

const isUserAdmin2 = (user) => {
  return user && user.role === "admin2";
};

const adminView = async (req, res) => {
  const allUsers = await serviceGetAllUsers();
  const allProducts = await serviceProductsFromDTO();
  const user = req.session.user;
  // console.log('session',req.session);
  console.log("allProducts", allProducts);
  const isAdmin = isUserAdmin(user);
  // console.log('asdasdadmin');
  const userProduct = allProducts.find((product) => product.tag === user.tag);
  console.log("userProduct", userProduct);
  // console.log('allProducts',allProducts[0])

  // Verificar si se encontró un producto para el usuario actual
  const filteredProducts = userProduct ? [userProduct] : [];

  res.render("admin", {
    user,
    isAdmin,
    allUsers,
    allProducts: filteredProducts,
    style: "index.css",
  });
};

const adminView1 = async (req, res) => {
  const allUsers = await serviceGetAllUsers();
  const allProducts = await serviceProductsFromDTO();
  const user = req.session.user;
  // console.log('session',req.session);
  console.log("allProducts", allProducts);
  const isAdmin1 = isUserAdmin1(user);
  // console.log('asdasdadmin');
  const userProduct = allProducts.find((product) => product.tag === user.tag);
  console.log("userProduct", userProduct);
  // console.log('allProducts',allProducts[0])

  // Verificar si se encontró un producto para el usuario actual
  const filteredProducts = userProduct ? [userProduct] : [];

  res.render("admin1", {
    user,
    isAdmin1,
    allUsers,
    allProducts: filteredProducts,
    style: "index.css",
  });
};

const adminView2 = async (req, res) => {
  const allUsers = await serviceGetAllUsers();
  const allProducts = await serviceProductsFromDTO();
  const user = req.session.user;
  // console.log('session',req.session);
  console.log("allProducts", allProducts);
  const isAdmin2 = isUserAdmin2(user);
  // console.log('asdasdadmin');
  const userProduct = allProducts.find((product) => product.tag === user.tag);
  console.log("userProduct", userProduct);
  // console.log('allProducts',allProducts[0])

  // Verificar si se encontró un producto para el usuario actual
  const filteredProducts = userProduct ? [userProduct] : [];

  res.render("admin2", {
    user,
    isAdmin2,
    allUsers,
    allProducts: filteredProducts,
    style: "index.css",
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect("/auth/login");
    } else res.send({ status: "error", payload: "Logout Error", body: err });
  });
};

export {
  login,
  logout,
  loginForm,
  getAllUsers,
  deleteAllUsers,
  deleteUserById,
  adminView,
  adminView1,
  adminView2,
  updateUserRole,
  updateUserEmail,
  restorePassword,
  renderRestorePassword,
};
