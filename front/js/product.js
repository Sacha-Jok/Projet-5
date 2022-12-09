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
        //product(productItem)
        console.log(productItem)
    })
    .catch((err)=>{
        console.log("oskour")
    });

//------------------------------------------------------------------------
//  Fonction d'affichage du produit
//------------------------------------------------------------------------ 

function product(productItem){
    let image = document.querySelector(".item__img");
    let title = document.querySelector("#title");
    let price = document.querySelector("#price");
    let description = document.querySelector("#description");
    let colors = document.querySelector("#colors");
}