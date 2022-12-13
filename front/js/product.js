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
//  Création de la classe de l'objet à ajouter au panier
//------------------------------------------------------------------------ 

class Product {
    constructor(_id, color) {
        this._id = _id;
        this.color = color;
    }
};

//------------------------------------------------------------------------
//  Fonction d'affichage du produit
//------------------------------------------------------------------------ 

const product = (productItem) => {
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
//  Choix de la couleur et création de l'objet "Product"
//------------------------------------------------------------------------ 

let colorChoice = document.querySelector("#colors");
let itemToCartColor;
let itemToCart;

colorChoice.addEventListener("input", (col) => {
    itemToCartColor = col.target.value;
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
    itemToCart = new Product (id, itemToCartColor)
});

//------------------------------------------------------------------------
//  Choix de la quantité
//------------------------------------------------------------------------ 

let quantityChoice = document.querySelector("#quantity");
let itemToCartQuantity;

quantityChoice.addEventListener("input", (qty) => {
    itemToCartQuantity = parseInt(qty.target.value);
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
});


//------------------------------------------------------------------------
//  Création du panier
//------------------------------------------------------------------------ 

let cartStorage = new Map();

//------------------------------------------------------------------------
//  Fonction d'ajout au panier
//------------------------------------------------------------------------ 

const cart = () => {
    let exist = cartStorage.has(itemToCart);
    if (!exist) {
        cartStorage.set(itemToCart, itemToCartQuantity);
        console.log(cartStorage)
    } else {
        cartStorage.set(itemToCart, itemToCartQuantity + cartStorage.get(itemToCart));
        console.log(cartStorage)
    }
}

//------------------------------------------------------------------------
//  Ajout au panier avec vérification de la quantité et de la couleur 
//------------------------------------------------------------------------ 

let addItemToCart = document.querySelector("#addToCart");
addItemToCart.addEventListener("click", () => {
    const color = itemToCart.color;
    const quantity = itemToCartQuantity;
    if ( color && quantity && (quantity >= 1 && quantity <= 100)){
        document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
        document.querySelector("#addToCart").textContent = "Ajouté !";
        cart();
        
    } else {
        alert("Veuillez choisir une couleur et/ou une quantité entre 1 et 100");
    }
});

//------------------------------------------------------------------------
//  Ajout du produit du panier dans le local storage 
//------------------------------------------------------------------------
