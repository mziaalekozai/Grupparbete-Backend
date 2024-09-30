const button = document.querySelector("#get-products");
const ul = document.querySelector(".product-list");
const addButton = document.querySelector(".add-toy-btn");
const toySection = document.querySelector(".product-section");

async function fetchAndDisplayProducts() {
  const response = await fetch("/product", {
    method: "GET",
  });
  const data = await response.json();
  console.log("Svar från servern: ", data);
  data.forEach((product) => createProductElement(product));
}

function createProductElement(product) {
  const div = document.createElement("div");
  div.classList.add("toy-list");

  const toyName = document.createElement("h3");
  toyName.innerText = `${product.name}`;

  const toyPrice = document.createElement("p");
  toyPrice.innerText = `${product.price} kr`;

  const bild = document.createElement("img");
  bild.classList.add("bild");
  bild.src = `${product.image}`;

  div.append(toyName, bild, toyPrice);

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

addButton.addEventListener("click", async () => {
  const form = document.createElement("form");
  form.classList.add("form-div");
  toySection.appendChild(form);

  const nameInput = document.createElement("input");
  const nameLabel = document.createElement("label");
  nameLabel.innerText = "Namn:";
  nameInput.setAttribute("id", "toy-name");
  nameInput.required = true;

  const priceInput = document.createElement("input");
  const priceLabel = document.createElement("label");
  priceLabel.innerText = "Pris:";
  priceInput.setAttribute("id", "toy-price");
  priceInput.required = true;

  const imageInput = document.createElement("input");
  const imageLabel = document.createElement("label");
  imageLabel.innerText = "Bild:";
  imageInput.setAttribute("id", "toy-image");
  imageInput.required = true;

  const addToyButton = document.createElement("button");
  addToyButton.innerText = "Lägg till";
  addToyButton.classList.add("add-toy-btn");
  addToyButton.disabled = true;

  form.append(
    nameLabel,
    nameInput,
    priceLabel,
    priceInput,
    imageLabel,
    imageInput,
    addToyButton
  );

  const checkFormValidity = () => {
    const isFormValid =
      nameInput.value.trim() !== "" &&
      priceInput.value.trim() !== "" &&
      imageInput.value.trim() !== "";

    addToyButton.disabled = !isFormValid;
  };

  nameInput.addEventListener("input", checkFormValidity);
  priceInput.addEventListener("input", checkFormValidity);
  imageInput.addEventListener("input", checkFormValidity);

  addToyButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const priceValue = priceInput.value.trim();
    const imageValue = imageInput.value.trim();

    const newToy = {
      name: nameValue,
      price: parseFloat(priceValue),
      image: imageValue,
    };

    const response = await fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Leksak tillagd: ", data);
      createProductElement(data);

      form.remove();
      addToyButton.disabled = true;
    } else {
      console.error("Fel vid tillägg av leksak");
    }
  });
});

fetchAndDisplayProducts();
