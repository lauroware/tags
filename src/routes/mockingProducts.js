import { Router } from "express";
import { generateUser } from "../utils/utils.js";
const mockRouter = Router();

const isUserAdmin = (user) => {
    return user && user.role === 'admin';
};

mockRouter.get("/", async (req, res) => {
    let user = req.session.user;
    let isAdmin = isUserAdmin(user);
    let users = [];
    let allProducts = [];
    for (let i = 0; i <= 10; i++) {
        users.push(generateUser());
    }
    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        allProducts = allProducts.concat(currentUser.products);
    }

    res.render("mockingProducts", { user, users, allProducts, isAdmin, style: "index.css" })
})

export default mockRouter