//----------------------------------------------------------------------
// Récupération et affichage de l'UUID de la commande
//----------------------------------------------------------------------

const getOrderId = () => {
    if (document.location.href.match("confirmation")) {
      localStorage.clear();
      let orderId = new URLSearchParams(document.location.search).get("commande");
      document.querySelector("#orderId").innerHTML = `<br>${orderId}`;
      orderId = "";
    }
};

getOrderId()