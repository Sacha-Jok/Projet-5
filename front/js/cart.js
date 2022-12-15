//------------------------------------------------------------------------
// Récupération du panier depuis le local storage
//------------------------------------------------------------------------ 

const cartStorage = JSON.parse(localStorage.getItem("Cart"));

//----------------------------------------------------------------------
// Affichage des articles de l'api sur la homepage
//----------------------------------------------------------------------

const cart = () => {
  let cartSum = 0
  let cartQuantity = 0
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

//------------------------------------------------------------------------
// Modification du titre si le panier est vide
//------------------------------------------------------------------------ 

if (cartStorage.length == 0) {
  document.querySelector("#cartAndFormContainer").innerHTML = `<h1>Votre panier est vide</h1>`
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
// Fonction de suppression d'un article du panier
//----------------------------------------------------------------------

const deleteItem = () => {
  document.querySelectorAll(".deleteItem").forEach((deleteOnClick) => {
    deleteOnClick.addEventListener("click", () => {
      const idToDelete = deleteOnClick.closest(".cart__item").getAttribute('data-id');
      const itemToDelete = cartStorage.findIndex((obj) => obj.id === idToDelete);
      if (itemToDelete !== -1) {
        cartStorage.splice(itemToDelete, 1)
      }
      window.localStorage.setItem("Cart", JSON.stringify(cartStorage));
      return location.reload();
    })
  })
}
