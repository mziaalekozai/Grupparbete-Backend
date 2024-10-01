import { createFormProduct } from "./createFormProduct.js";
const toySection = document.querySelector(".product-section");

export function changeProduct(productId) {
  fetch(`/product/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const form = createFormProduct(product, async (updatedToy) => {
        try {
          const response = await fetch(`/product/${productId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedToy),
          });
          let responseData;
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            responseData = await response.json();
          } else {
            responseData = await response.text();
          }

          if (response.ok) {
            const productElement = document.querySelector(
              `[data-id='${productId}']`
            );
            if (productElement) {
              productElement.querySelector("h3").innerText = updatedToy.name;
              productElement.querySelector(
                "p:nth-of-type(1)"
              ).innerText = `${updatedToy.price} kr`;
              productElement.querySelector(
                "p:nth-of-type(2)"
              ).innerText = `${updatedToy.amountInStock} st`;
              productElement.querySelector("img").src = updatedToy.image;
            }
            form.remove();
          } else {
            console.error("Fel vid uppdatering av leksak", responseData);
          }
        } catch (error) {
          console.error("Ett oväntat fel uppstod: ", error);
        }
      });

      toySection.appendChild(form);
    });
}
