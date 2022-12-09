//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------ 

fetch("http://localhost:3000/api/products")
    .then ((res)=> res.json())
    .then ((productItem)=>{
        Kanaps(productItem)
    })

    .catch((err)=>{
        document.querySelector(".titles").innerHTML = "<h1>Erreur de chargement des produits</h1>"
    });

//----------------------------------------------------------------------
// Affichage des articles de l'api sur la homepage
//----------------------------------------------------------------------

function Kanaps(index) {
    let productSection = document.querySelector("#items");
    for (let product of index) {
      productSection.innerHTML += 
        `<a href="./product.html?_id=${product._id}">
            <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                 <p class="productDescription">${product.description}</p>
            </article>
        </a>`;
    }
  }
  