//------------------------------------------------------------------------
// Récupération de l'ID depuis l'URL
//------------------------------------------------------------------------ 

const params = new URLSearchParams(document.location.search);
const id = params.get("_id");

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
//  Création du panier
//------------------------------------------------------------------------ 

let cartStorage = [];
let recoverCart = JSON.parse(localStorage.getItem("Cart"));

if (recoverCart !== null || undefined){
    cartStorage = recoverCart;
} 

//------------------------------------------------------------------------
//  Création de l'objet à ajouter au panier
//------------------------------------------------------------------------ 

let itemToCart = { id: id, color: "", quantity: 1};

//------------------------------------------------------------------------
//  Fonction d'affichage du produit
//------------------------------------------------------------------------ 

const product = (productItem)=> {
    const {imageUrl, altTxt, name, price, description, colors} = productItem;
    document.querySelector(".item__img").innerHTML = `<img src="${imageUrl}" alt="${altTxt}">`;
    document.querySelector("#title").textContent = name;
    document.querySelector("title").textContent = name;
    document.querySelector("#price").textContent = price;
    document.querySelector("#description").textContent = description;
    for (const color of colors){
        document.querySelector("#colors").innerHTML += `<option value ="${color}">${color}</option>`
    }
}

//------------------------------------------------------------------------
//  Fonction reset du bouton
//------------------------------------------------------------------------ 

const resetButton = () => {
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "Ajouter au panier";
}

//------------------------------------------------------------------------
//  Choix de la couleur
//------------------------------------------------------------------------ 

let itemToCartColor;

document.querySelector("#colors").addEventListener("input", (col) => {
    itemToCartColor = col.target.value;
    itemToCart.color = itemToCartColor;
});

//------------------------------------------------------------------------
//  Choix de la quantité
//------------------------------------------------------------------------ 

let itemToCartQuantity;

document.querySelector("#quantity").addEventListener("input", (qty) => {
    itemToCartQuantity = parseInt(qty.target.value);
    itemToCart.quantity = itemToCartQuantity;
});

//------------------------------------------------------------------------
//  Vérification de la quantité et de la couleur lors de l'ajout au panier
//------------------------------------------------------------------------ 

document.querySelector("#addToCart").addEventListener("click", () => {
    const { quantity, color } = itemToCart;
    if (color && quantity && (quantity >= 1 && quantity <= 100)){
        document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
        document.querySelector("#addToCart").textContent = "Ajouté !";
        setTimeout(resetButton, 1000);
        addToCart();
    } else {
        alert("Veuillez choisir une couleur et/ou une quantité entre 1 et 100");
    }
});

//------------------------------------------------------------------------
//  Fonction d'ajout au panier
//------------------------------------------------------------------------ 

const addToCart = () => {
    const search = (element) => (element.id === itemToCart.id && element.color === itemToCart.color);
    const index = cartStorage.findIndex(search);
    if (index > -1) {
        cartStorage[index].quantity = cartStorage[index].quantity + itemToCart.quantity;
    } else {
        cartStorage = [...cartStorage, itemToCart]
    }
    itemToCart = { id: id, color: itemToCartColor, quantity: itemToCartQuantity};
    window.localStorage.setItem("Cart", JSON.stringify(cartStorage));
}

