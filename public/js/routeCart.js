const cartDataSpan = document.getElementById("cartQuantity");
const cartLink = document.querySelector("#cartLink");

cartLink.href = url;

const getCart = async () => {
  let quantityInCart = await getQuantityInCart();
  quantityInCart === 0 || !quantityInCart
    ? (cartDataSpan.innerHTML = "")
    : (cartDataSpan.innerHTML = quantityInCart);
};
getCart();
