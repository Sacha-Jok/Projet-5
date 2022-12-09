//------------------------------------------------------------------------
// Récupération de l'ID depuis l'URL
//------------------------------------------------------------------------ 

let params = new URLSearchParams(document.location.search)
let id = params.get("_id")
console.log(id)

//------------------------------------------------------------------------
// Récupération des produits de l'api
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
//  Fonction d'affichage du produit
//------------------------------------------------------------------------ 

function product(productItem){
    const {imageUrl, altTxt, name, price, description, colors} = productItem;
    let productImage = document.querySelector(".item__img");
    let productTitle = document.querySelector("#title");
    let productPrice = document.querySelector("#price");
    let productDescription = document.querySelector("#description");
    let productColors = document.querySelector("#colors");
    productImage.innerHTML = `<img src="${imageUrl}" alt="${altTxt}">`;
    productTitle.textContent = name;
    productPrice.textContent = price;
    productDescription.textContent = description;
    for (const color of colors){
        productColors.innerHTML += `<option value ="${color}">${color}</option>`
    }
}