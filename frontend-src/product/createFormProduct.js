export function createFormProduct(product = {}, onSubmit) {
  const form = document.createElement("form");
  form.classList.add("form-div");

  const nameInput = document.createElement("input");
  const nameLabel = document.createElement("label");
  nameLabel.innerText = "Namn:";
  nameInput.setAttribute("id", "toy-name");
  nameInput.required = true;
  nameInput.value = product.name || "";

  const nameError = document.createElement("p");
  nameError.classList.add("error-message");

  const priceInput = document.createElement("input");
  const priceLabel = document.createElement("label");
  priceLabel.innerText = "Pris:";
  priceInput.setAttribute("id", "toy-price");
  priceInput.required = true;
  priceInput.value = product.price || "";

  const priceError = document.createElement("p");
  priceError.classList.add("error-message");

  const imageInput = document.createElement("input");
  const imageLabel = document.createElement("label");
  imageLabel.innerText = "Bild:";
  imageInput.setAttribute("id", "toy-image");
  imageInput.required = true;
  imageInput.value = product.image || "";

  const imageError = document.createElement("p");
  imageError.classList.add("error-message");

  const amountInput = document.createElement("input");
  const amountLabel = document.createElement("label");
  amountLabel.innerText = "Antal:";
  amountInput.setAttribute("id", "toy-amount");
  amountInput.required = true;
  amountInput.value = product.amountInStock || "";

  const amountError = document.createElement("p");
  amountError.classList.add("error-message");

  const submitButton = document.createElement("button");
  submitButton.innerText = product._id ? "Ändra" : "Lägg till";
  submitButton.classList.add("submit-toy-btn");
  submitButton.disabled = true;

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
