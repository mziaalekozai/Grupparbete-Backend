import { createProductElement } from "./createProductElement.js";

const addButton = document.querySelector(".add-toy-btn");
const toySection = document.querySelector(".product-section");
const ul = document.querySelector(".product-list");

addButton.addEventListener("click", async () => {
  const form = document.createElement("form");
  form.classList.add("form-div");
  toySection.appendChild(form);

  const nameInput = document.createElement("input");
  const nameLabel = document.createElement("label");
  nameLabel.innerText = "Namn:";
  nameInput.setAttribute("id", "toy-name");
  nameInput.required = true;

  const nameError = document.createElement("p");
  nameError.classList.add("error-message");

  const priceInput = document.createElement("input");
  const priceLabel = document.createElement("label");
  priceLabel.innerText = "Pris:";
  priceInput.setAttribute("id", "toy-price");
  priceInput.required = true;

  const priceError = document.createElement("p");
  priceError.classList.add("error-message");

  const imageInput = document.createElement("input");
  const imageLabel = document.createElement("label");
  imageLabel.innerText = "Bild:";
  imageInput.setAttribute("id", "toy-image");
  imageInput.required = true;

  const imageError = document.createElement("p");
  imageError.classList.add("error-message");

  const amountInput = document.createElement("input");
  const amountLabel = document.createElement("label");
  amountLabel.innerText = "Antal:";
  amountInput.setAttribute("id", "toy-amount");
  amountInput.required = true;

  const amountError = document.createElement("p");
  amountError.classList.add("error-message");

  const addToyButton = document.createElement("button");
  addToyButton.innerText = "Lägg till";
  addToyButton.classList.add("add-toy-btn");
  addToyButton.disabled = true;

  form.append(
    nameLabel,
    nameInput,
    nameError,
    priceLabel,
    priceInput,
    priceError,
    imageLabel,
    imageInput,
    imageError,
    amountLabel,
    amountInput,
    amountError,
    addToyButton
  );
  const checkFormValidity = () => {
    const isFormValid =
      nameInput.value.trim() !== "" &&
      priceInput.value.trim() !== "" &&
      imageInput.value.trim() !== "" &&
      amountInput.value.trim() !== "";
    addToyButton.disabled = !isFormValid;
  };

  nameInput.addEventListener("input", checkFormValidity);
  priceInput.addEventListener("input", checkFormValidity);
  imageInput.addEventListener("input", checkFormValidity);
  amountInput.addEventListener("input", checkFormValidity);

  addToyButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const priceValue = priceInput.value.trim();
    const imageValue = imageInput.value.trim();
    const amountValue = amountInput.value.trim();

    const newToy = {
      name: nameValue,
      price: parseFloat(priceValue),
      image: imageValue,
      amountInStock: parseInt(amountValue),
    };
    try {
      const response = await fetch("/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToy),
      });

      if (response.ok) {
        const data = await response.json();
        const newProduct = await fetch(`/product/${data.insertedId}`);
        const productData = await newProduct.json();
        console.log("Leksak tillagd: ", productData);
        createProductElement(productData, ul);
        form.remove();
        addToyButton.disabled = true;
      } else {
        const errorData = await response.json();
        console.error("Fel vid tillägg av leksak: ", errorData);

        nameError.textContent = errorData.message.includes("name")
          ? "Ogiltigt namn"
          : "";
        priceError.textContent = errorData.message.includes("price")
          ? "Ogiltigt pris"
          : "";
        imageError.textContent = errorData.message.includes("image")
          ? "Ogiltig bild-URL"
          : "";
        amountError.textContent = errorData.message.includes("amountInStock")
          ? "Ogiltig antal"
          : "";
      }
    } catch (error) {
      console.error("Ett oväntat fel uppstod: ", error);
    }
  });
});
