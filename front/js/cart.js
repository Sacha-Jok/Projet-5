//------------------------------------------------------------------------
// Récupération du panier depuis le local storage
//------------------------------------------------------------------------ 

const cartStorage = JSON.parse(localStorage.getItem("Cart"));

//----------------------------------------------------------------------
// Affichage des articles de l'api sur la page panier
//----------------------------------------------------------------------
const cart = () => {
  let cartSum = 0
  let cartQuantity = 0
  if (cartStorage) {
    for (let i = 0; i < cartStorage.length ;i++ ) {
      fetch(`http://localhost:3000/api/products/${cartStorage[i].id}`)
      .then ((res)=> res.json())
      .then ((recoveredApiInfo)=>{
          cartSum += (recoveredApiInfo.price * cartStorage[i].quantity)
          cartQuantity += cartStorage[i].quantity
          fillCart(recoveredApiInfo, cartStorage[i], cartSum, cartQuantity)
      })
    }
  }
}

//------------------------------------------------------------------------
// Modification du titre si le panier est vide
//------------------------------------------------------------------------ 

if (!cartStorage) {
  document.querySelector("#cartAndFormContainer").innerHTML = `<h1>Votre panier est vide</h1>`
}

//----------------------------------------------------------------------
// Fonction de suppression d'un article du panier
//----------------------------------------------------------------------

const deleteItem = () => {
  document.querySelectorAll(".deleteItem").forEach((deleteOnClick) => {
    deleteOnClick.addEventListener("click", () => {
      const idToDelete = deleteOnClick.closest(".cart__item").getAttribute('data-id');
      const colorToDelete = deleteOnClick.closest(".cart__item").getAttribute('data-color');
      const itemToDelete = cartStorage.findIndex((obj) => obj.id === idToDelete && obj.color === colorToDelete);
      if (itemToDelete !== -1) {
        cartStorage.splice(itemToDelete, 1)
      }
      window.localStorage.setItem("Cart", JSON.stringify(cartStorage));
      return location.reload();
    })
  })
}

//----------------------------------------------------------------------
// Fonction de modification de la quantité d'un article du panier
//----------------------------------------------------------------------

const changeQuantity = () => {
  document.querySelectorAll(".itemQuantity").forEach((changeQuantity) => {
    changeQuantity.addEventListener("input", (qty) => {
      const newQuantity = parseInt(qty.target.value)
      const idToChange = changeQuantity.closest(".cart__item").getAttribute('data-id');
      const colorToChange = changeQuantity.closest(".cart__item").getAttribute('data-color');
      const itemToChange = cartStorage.findIndex((obj) => obj.id === idToChange && obj.color === colorToChange);
      if (itemToChange !== -1) {
        cartStorage[itemToChange].quantity = newQuantity;
      }
      console.log(cartStorage)
      window.localStorage.setItem("Cart", JSON.stringify(cartStorage));
      window.location.reload()
    })
  })
}

//----------------------------------------------------------------------
// Génération du bloc de chaque article du panier
//----------------------------------------------------------------------

const fillCart = (productInfo, product, cartSum, cartQuantity) => {
  document.querySelector("#cart__items").innerHTML +=
    `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productInfo.name}</h2>
        <p>${product.color}</p>
        <p>${productInfo.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté :  </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`
    document.querySelector("#totalQuantity").innerText = `${cartQuantity}`
    document.querySelector("#totalPrice").innerText = `${cartSum}`
    deleteItem()
    changeQuantity()
}

//----------------------------------------------------------------------
// Execution des fonctions
//----------------------------------------------------------------------

cart()

//----------------------------------------------------------------------
// Vérification de la validité du formulaire de contact
//----------------------------------------------------------------------

document.querySelectorAll('.input').forEach((formInput) => {
  formInput.addEventListener('change', (e) => {
    const inputPattern = formInput.closest(".input").checkValidity();
    const changeErrorMsg = e.currentTarget.closest(".cart__order__form__question").querySelector('.errorMsg');
    if (inputPattern == false) {
      changeErrorMsg.innerText = `Merci de respecter le format demandé`  
    } else {
      changeErrorMsg.innerText = ``
    }
  });
});

//----------------------------------------------------------------------
// Création du tableau "id"
//----------------------------------------------------------------------

let products = [];
const idArray = () => {
  let cart = JSON.parse(localStorage.getItem("Cart"));
  if (cart && cart.length > 0) {
    for (let i of cart) {
      products.push(i.id);
    }
  }
}

//----------------------------------------------------------------------
// Création de l'objet "order" lors de la validation du formulaire
//----------------------------------------------------------------------

let order;

if (cartStorage) {
  document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    idArray();
    let data = new FormData(e.target)
    const contact = Object.fromEntries(data.entries());
    order = {contact, products}
    sendOrder()
  })
}

//----------------------------------------------------------------------
// Envoi de la commande
//----------------------------------------------------------------------

const sendOrder = () => {
  console.log(order)
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
  .then((res) => res.json())
  .then((data) => {
    window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
    //getOrderId()
  })
  .catch((err)=> {
    console.error(err)
  });
}
