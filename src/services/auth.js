import UserRepository from "../repositories/users.repository.js";
import { serviceAddCart } from "./cart.js";
const userRepository = new UserRepository()
const serviceGetAllUsers = async () => {
    let users = await userRepository.getAllUsers();
    return users;
}

const serviceGetUserByEmail = async (email) => {
    let user = await userRepository.getUserByEmail(email);
    return user;
}

const serviceSaveUser = async (newUser) => {
    let newCart = await serviceAddCart()
    let savedUser = await userRepository.saveUser(newUser, newCart._id);
    return savedUser;
}

const serviceLoginUser = async (user) => {
    let userInDb = await userRepository.findUser(user);
    return userInDb;
}

const serviceUpdateUserRole = async (uid, newRole) => {
    let updatedUser = await userRepository.updateUserRole(uid, newRole);
    return updatedUser;
}

const serviceDeleteAllUsers = async () => {
    let deletedUsers = await userRepository.deleteUsers();
    return deletedUsers;
}

const serviceDeleteUserById = async (uid) => {
    let deletedUser = await userRepository.deleteUserById(uid);
    return deletedUser;
}

const serviceDeleteInactiveUsers = async () => {
    let deletedUsers = await userRepository.deleteInactiveUsers();
    return deletedUsers;
}

const serviceRestorePassword = async (email, newPassword) => {
    let updatedUser = await userRepository.restorePassword(email, newPassword);
    return updatedUser;
}

export { serviceGetAllUsers, serviceGetUserByEmail, serviceSaveUser, serviceLoginUser, serviceDeleteAllUsers, serviceDeleteUserById, serviceDeleteInactiveUsers, serviceUpdateUserRole, serviceRestorePassword }
