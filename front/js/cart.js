//------------------------------------------------------------------------
// Récupération du panier depuis le local storage
//------------------------------------------------------------------------ 

const cartProduct = JSON.parse(localStorage.getItem("Cart"));

//----------------------------------------------------------------------
// Affichage des articles de l'api sur la homepage
//----------------------------------------------------------------------

const cart = () => {
  let cartSum = 0
  for (let i = 0; i < cartProduct.length ;i++ ) {
    fetch(`http://localhost:3000/api/products/${cartProduct[i].id}`)
    .then ((res)=> res.json())
    .then ((recoveredApiInfo)=>{
        cartSum += recoveredApiInfo.price
        fillCart(recoveredApiInfo, cartProduct[i], cartSum)
    })
  }   
}

//----------------------------------------------------------------------
// Génération du bloc de chaque article du panier
//----------------------------------------------------------------------

const fillCart = (productInfo, product, cartSum) => {
  document.querySelector("#cart__items").innerHTML +=
    `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productInfo.name}</h2>
        <p>${product.color}</p>
        <p>${productInfo.price}</p>
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
    document.querySelector("#totalPrice").innerText = `${cartSum}`
}

//----------------------------------------------------------------------
// Execution de la fonction
//----------------------------------------------------------------------

cart()

  