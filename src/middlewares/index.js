import { serviceGetUserByEmail } from "../services/auth.js";

const authMiddleware = (req, res, next) => {
  // Permitir el acceso sin autenticación para todas las rutas relacionadas con productos
  if (req.originalUrl.startsWith("/api/products")) {
    next();
  } else {
    // Verificar la autenticación para otras rutas
    const user = req.session?.user;
    if (user) {
      next();
    } else {
      res.status(401).send({
        status: "Unauthorized",
        message: "Unauthorized to do this action",
        code: 401,
      });
    }
  }
};

const adminOnly = async (req, res, next) => {
  const user = await serviceGetUserByEmail(req.session?.user?.email);
  if (user?.role === "admin") {
    next();
  } else {
    res.status(401).send({
      status: "Unauthorized",
      message: "Unauthorized to do this action",
      code: 401,
    });
  }
};

const premiumOnly = async (req, res, next) => {
  const user = await serviceGetUserByEmail(req.session?.user?.email);
  if (user?.role === "premium") {
    next();
  } else {
    res.status(401).send({
      status: "Unauthorized",
      message: "Unauthorized to do this action",
      code: 401,
    });
  }
};

const premiumOrAdmin = async (req, res, next) => {
  const user = await serviceGetUserByEmail(req.session?.user?.email);
  if (user?.role === "premium" || user?.role === "admin") {
    next();
  } else {
    res.status(401).send({
      status: "Unauthorized",
      message: "Unauthorized to do this action",
      code: 401,
    });
  }
};

export { authMiddleware, adminOnly, premiumOnly, premiumOrAdmin };
