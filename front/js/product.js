//------------------------------------------------------------------------
// Récupération de l'ID depuis l'URL
//------------------------------------------------------------------------ 

let params = new URLSearchParams(document.location.search)
let id = params.get("_id")

//------------------------------------------------------------------------
// Récupération du produit souhaité via l'api
//------------------------------------------------------------------------ 

fetch(`http://localhost:3000/api/products/${id}`)
    .then ((res)=> res.json())
    .then ((productItem)=>{
        product(productItem)
    })
    .catch((err)=>{
        console.error(err)
    });

//------------------------------------------------------------------------
//  Création de l'objet à ajouter au panier
//------------------------------------------------------------------------ 

let itemToCart = {};
itemToCart._id = id;

//------------------------------------------------------------------------
//  Fonction d'affichage du produit
//------------------------------------------------------------------------ 

function product(productItem){
    const {imageUrl, altTxt, name, price, description, colors} = productItem;
    let productImage = document.querySelector(".item__img");
    let productTitle = document.querySelector("#title");
    let productPageTitle = document.querySelector("title");
    let productPrice = document.querySelector("#price");
    let productDescription = document.querySelector("#description");
    let productColors = document.querySelector("#colors");
    productImage.innerHTML = `<img src="${imageUrl}" alt="${altTxt}">`;
    productTitle.textContent = name;
    productPageTitle.textContent = name;
    productPrice.textContent = price;
    productDescription.textContent = description;
    for (const color of colors){
        productColors.innerHTML += `<option value ="${color}">${color}</option>`
    }
}

//------------------------------------------------------------------------
//  Choix de la quantité
//------------------------------------------------------------------------ 

let quantityChoice = document.querySelector("#quantity");
let itemToCartQuantity;

quantityChoice.addEventListener("input", (qty) => {
    itemToCartQuantity = qty.target.value;
    itemToCart.quantity = itemToCartQuantity;
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
});

//------------------------------------------------------------------------
//  Choix de la couleur
//------------------------------------------------------------------------ 

let colorChoice = document.querySelector("#colors");
let itemToCartColor;

colorChoice.addEventListener("input", (col) => {
    itemToCartColor = col.target.value;
    itemToCart.color = itemToCartColor;
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
});

//------------------------------------------------------------------------
//  Vérification de la quantité et de la couleur lors de l'ajout au panier
//------------------------------------------------------------------------ 

let addItemToCart = document.querySelector("#addToCart");
addItemToCart.addEventListener("click", () => {
    const { quantity, color } = itemToCart;
    if (color && quantity && (quantity >= 1 && quantity <= 100)){
        document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
        document.querySelector("#addToCart").textContent = "Ajouté !";
        cart();
    } else {
        alert("Veuillez choisir une couleur et/ou une quantité entre 1 et 100");
    }
});

