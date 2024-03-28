import { Router } from "express";
import {
  authMiddleware,
  adminOnly,
  premiumOnly,
  adminOnly1,
} from "../middlewares/index.js";
import {
  login,
  logout,
  loginForm,
  getAllUsers,
  deleteAllUsers,
  deleteUserById,
  adminView,
  adminView1,
  updateUserRole,
  updateUserEmail,
  renderRestorePassword,
  restorePassword,
} from "../controllers/userManager.js";
import { getProductById } from "../controllers/productManager.js";
import passport from "passport";
import { getProductsFromPremiumUsers } from "../controllers/productManager.js";
import SendmailTransport from "nodemailer/lib/sendmail-transport/index.js";
const authRouter = Router();

authRouter.get("/login", loginForm);

authRouter.post("/login", login);

authRouter.get("/adminView", adminOnly, adminView, getProductsFromPremiumUsers);
authRouter.get(
  "/adminView1",
  adminOnly1,
  adminView1,
  getProductsFromPremiumUsers
);

authRouter.get("/", adminOnly, getAllUsers);

authRouter.put(
  "/adminView/users/:uid",
  adminOnly,
  updateUserRole,
  updateUserEmail
);

authRouter.delete(
  "/adminView/users",
  adminOnly,
  deleteAllUsers,
  getProductsFromPremiumUsers
);

authRouter.delete("/adminView/users/:uid", adminOnly, deleteUserById);

// La siguiente ruta se convierte en pública
authRouter.get("/products/:id", getProductById);

authRouter.get("/restorePassword", renderRestorePassword);

authRouter.put("/restorePassword", restorePassword);

authRouter.get("/premiumView", premiumOnly, getProductsFromPremiumUsers);

authRouter.get("/logout", logout);

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

authRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/products");
  }
);

export default authRouter;
