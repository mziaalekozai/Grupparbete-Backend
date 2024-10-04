import { changeProduct } from "./changeProduct.js";
export function createProductElement(product, ul) {
  //   console.log("Produktdata i createProductElement: ", product);

  if (Array.isArray(product) && product.length > 0) {
    product = product[0];
  }

  const div = document.createElement("div");
  div.classList.add("toy-list");

  const toyName = document.createElement("h3");
  toyName.innerText = `${product.name}`;

  const toyPrice = document.createElement("p");
  toyPrice.innerText = `${product.price} kr`;

  const toyAmount = document.createElement("p");
  toyAmount.innerText = `${product.amountInStock} st`;

  const bild = document.createElement("img");
  bild.classList.add("bild");
  bild.src = `${product.image}`;
  div.append(toyName, bild, toyPrice, toyAmount);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");
  div.append(buttonDiv);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Ta bort";
  deleteButton.classList.add("delete-btn");
  buttonDiv.appendChild(deleteButton);
  div.setAttribute("data-id", product._id || product.insertedId);

  const changeButton = document.createElement("button");
  changeButton.classList.add("change-btn");
  changeButton.innerText = "Ändra";
  buttonDiv.appendChild(changeButton);

  div.setAttribute("data-id", product._id || product.insertedId);

  deleteButton.addEventListener("click", async () => {
    const productId = div.getAttribute("data-id");
    const response = await fetch(`/product/${productId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Produkt raderad!");
      div.remove();
    } else {
      const data = await response.json();
      console.error("Fel vid radering: ", data);
    }
  });

  changeButton.addEventListener("click", (event) => {
    if (event.target.classList.contains("change-btn")) {
      const productId = event.target
        .closest(".toy-list")
        .getAttribute("data-id");
      changeProduct(productId);
    }
  });

  ul.append(div);
}

export function removeAllProducts(ul) {
  const productDivs = ul.querySelectorAll(".toy-list");
  productDivs.forEach((div) => {
    div.remove();
  });
}
