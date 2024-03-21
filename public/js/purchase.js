let stripe;
let elements;
document.addEventListener("DOMContentLoaded", (event) => {
  fetch("/publicKey")
    .then((result) => result.json())
    .then((data) => {
      stripe = Stripe(data.publicKey);
      elements = stripe.elements();
      card = elements.create("card");
      card.mount("#card-element");
    });
});

const purchaseProducts = async (cid) => {
  await fetch(
    `${window.location.protocol}//${window.location.host}/api/carts/${cid}/purchase`,
    { method: "POST" }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success") {
        stripe
          .confirmCardPayment(res.payload.client_secret, {
            payment_method: {
              card: card,
            },
          })
          .then((result) => {
            if (result.error) {
              Swal.fire({
                html: `<p>${result.error.message}</p> `,
                icon: "error",
                showConfirmButton: true,
                confirmButtonText: "Continuar",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          });
      } else {
        console.log(res.payload);
      }
    });
};

const goBackToCart = (cid) => {
  window.location.href = `/api/carts/${cid}`;
};
