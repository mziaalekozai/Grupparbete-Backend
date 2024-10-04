export function createFormProduct(product = {}, onSubmit) {
  const form = document.createElement("form");
  form.classList.add("form-div");

  const nameInput = document.createElement("input");
  const nameLabel = document.createElement("label");
  nameLabel.innerText = "Namn:";
  nameInput.setAttribute("id", "toy-name");
  nameInput.required = true;
  nameInput.value = product.name || "";

  const priceInput = document.createElement("input");
  const priceLabel = document.createElement("label");
  priceLabel.innerText = "Pris:";
  priceInput.setAttribute("id", "toy-price");
  priceInput.required = true;
  priceInput.value = product.price || "";

  const imageInput = document.createElement("input");
  const imageLabel = document.createElement("label");
  imageLabel.innerText = "Bild:";
  imageInput.setAttribute("id", "toy-image");
  imageInput.required = true;
  imageInput.value = product.image || "";

  const amountInput = document.createElement("input");
  const amountLabel = document.createElement("label");
  amountLabel.innerText = "Antal:";
  amountInput.setAttribute("id", "toy-amount");
  amountInput.required = true;
  amountInput.value = product.amountInStock || "";

  const submitButton = document.createElement("button");
  submitButton.innerText = product._id ? "Ändra" : "Lägg till";
  submitButton.classList.add("submit-toy-btn");
  submitButton.disabled = true;

  form.append(
    nameLabel,
    nameInput,
    priceLabel,
    priceInput,
    imageLabel,
    imageInput,
    amountLabel,
    amountInput,
    submitButton
  );

  const checkFormValidity = () => {
    const isFormValid =
      nameInput.value.trim() !== "" &&
      priceInput.value.trim() !== "" &&
      imageInput.value.trim() !== "" &&
      amountInput.value.trim() !== "";
    submitButton.disabled = !isFormValid;
  };

  nameInput.addEventListener("input", checkFormValidity);
  priceInput.addEventListener("input", checkFormValidity);
  imageInput.addEventListener("input", checkFormValidity);
  amountInput.addEventListener("input", checkFormValidity);

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const newToy = {
      name: nameInput.value.trim(),
      price: parseFloat(priceInput.value.trim()),
      image: imageInput.value.trim(),
      amountInStock: parseInt(amountInput.value.trim()),
    };

    onSubmit(newToy);
  });

  return form;
}
