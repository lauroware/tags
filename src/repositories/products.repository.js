import ProductsDAOMongoDb from "../daos/productsMongooseDao.js";
import { productSchema } from "../models/products.model.js";
const productDAO = new ProductsDAOMongoDb("products", productSchema);

class ProductRepository {
  async getProducts(filters) {
    return productDAO.getProducts(filters);
  }
  async getProductById(pid) {
    return productDAO.getProductById(pid);
  }
  async addProduct(product, uid) {
    return productDAO.addProduct(product, uid);
  }

  async getProductsCreatedBy(uid) {
    try {
      // Lógica para obtener productos creados por un usuario específico
      const productsCreatedByUser = await productDAO.getProductsCreatedBy(uid);
      return productsCreatedByUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductsDTO() {
    return productDAO.getAllProductsFromDTO();
  }

  async getProductsCreatedBy(uid) {
    return productDAO.getAllProductsCreatedBy(uid);
  }

  async updateProduct(pid, updates) {
    return productDAO.updateProduct(pid, updates);
  }
  async deleteProductById(pid) {
    return productDAO.deleteProductById(pid);
  }
  async deleteAllProducts() {
    return productDAO.deleteAllProducts();
  }
}

export default ProductRepository;
