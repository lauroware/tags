import ProductRepository from "../repositories/products.repository.js";
const productRepository = new ProductRepository();

const serviceGetProducts = async (filters) => {
  let products = await productRepository.getProducts(filters);
  return products;
};

const serviceGetProductById = async (pid) => {
  let product = await productRepository.getProductById(pid);
  return product;
};

const serviceAddProduct = async (product, uid) => {
  let newProduct = await productRepository.addProduct(product, uid);
  return newProduct;
};

const serviceProductsFromDTO = async () => {
  let allProducts = await productRepository.getProductsDTO();
  return allProducts;
};

const serviceUpdateProduct = async (pid, updates) => {
  let updatedProduct = await productRepository.updateProduct(pid, updates);
  return updatedProduct;
};

const serviceDeleteAllProducts = async () => {
  let deleteAllProducts = await productRepository.deleteAllProducts();
  return deleteAllProducts;
};

const serviceDeleteProductById = async (pid) => {
  let deletedProduct = await productRepository.deleteProductById(pid);
  return deletedProduct;
};

const serviceProductsCreatedBy = async (productModel, userId) => {
  try {
    // Realizar la consulta para obtener los productos creados por el usuario
    const allProductsCreatedByUser = await productModel.find({
      createdBy: userId,
    });
    return allProductsCreatedByUser;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  serviceAddProduct,
  serviceDeleteProductById,
  serviceDeleteAllProducts,
  serviceGetProductById,
  serviceGetProducts,
  serviceUpdateProduct,
  serviceProductsFromDTO,
  serviceProductsCreatedBy,
};
