const productSection = document.querySelector(".product-section"); // Hämta produktsektionen från DOM
const logInSection = document.querySelector(".logIn-section"); // Hämta produktsektionen från DOM
const form = document.querySelector("#loginForm");
const error = document.querySelector(".error");
// error.style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim(); // Trimma för att undvika onödiga blanksteg

    try {
      const response = await fetch(
        `/user?username=${encodeURIComponent(username)}`,
        {
          method: "GET",
        }
      );
      const users = await response.json(); // Antag att detta är en array av användarobjekt

      const userFound = users.find((user) => user.name === username);

      if (userFound) {
        console.log("Login successful", userFound);

        logInSection.style.display = "none";
        productSection.style.display = "block";
      } else {
        error.style.display = "block";

        // alert("Invalid username");
      }
    } catch (error) {
      console.error("Error during login:", error);
      //   alert("An error occurred during login. Please try again.");
    }
  });
});
const logOut = document.querySelector(".logOut-btn");
logOut.addEventListener("click", () => {
  logInSection.style.display = "block";
  productSection.style.display = "none";
  error.style.display = "none";
});
