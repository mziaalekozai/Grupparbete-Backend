export function createProductElement(product, ul) {
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

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Ta bort";
  deleteButton.classList.add("delete-btn");
  div.appendChild(deleteButton);
  div.setAttribute("data-id", product._id);

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

  ul.append(div);
}
