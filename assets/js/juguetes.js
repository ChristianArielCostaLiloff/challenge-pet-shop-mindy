const navSearch = document.getElementById("nav-search-content");
const container = document.getElementById("container");

showContent();
async function showContent() {
  let data;
  try {
    data = await (
      await fetch("https://apipetshop.herokuapp.com/api/articulos")
    ).json();
  } catch (error) {
    console.log("Error with API");
  }
  dataToysProducts = data.response.filter(
    (product) => product.tipo == "Juguete"
  );
  dataToysProducts.forEach(createProduct);
  navSearch.addEventListener("input", function () {
    let minPrice = document.getElementById("min-price").value;
    let maxPrice = document.getElementById("max-price").value;
    let textSearch = document.getElementById("text-search").value.toLowerCase();
    let sortedProducts = dataToysProducts.filter(
      (product) =>
        minPrice <= product.precio &&
        product.precio <= maxPrice &&
        product.nombre.includes(textSearch)
    );
    clearHtml(container);
    sortedProducts.forEach(createProduct);
    //0 Elements
    if (sortedProducts.length < 1) {
      container.innerHTML = "<h2>No elements to display</h2>";
    }
  });
}
function clearHtml(domElement) {
  domElement.innerHTML = "";
}
function createProduct(product) {
  container.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${product.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.nombre}</h5>
            <p class="card-text">${product.descripcion}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    `;
}
