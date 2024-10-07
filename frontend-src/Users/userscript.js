export let loggedInUser;
export let loggedInUserName;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#loginForm");
  const productSection = document.querySelector(".product-section");
  const logInSection = document.querySelector(".logIn-section");
  const error = document.querySelector(".error");
  let formDiv = null;
  let UserList = null;

  form.addEventListener("submit", (event) => handleLogin(event));
  document.querySelector(".logOut-btn").addEventListener("click", handleLogout);
  document.querySelector(".showUsers-btn").addEventListener("click", showUsers);
  document
    .querySelector(".addUser-btn")
    .addEventListener("click", () => toggleUserForm(true));

  function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    authenticateUser(username);
  }

  async function authenticateUser(username) {
    try {
      const response = await fetch(
        `/user?username=${encodeURIComponent(username)}`,
        { method: "GET" }
      );
      const users = await response.json();
      const userFound = users.find((user) => user.name === username);

      if (userFound) {
        loggedInUser = userFound._id;
        loggedInUserName = userFound.name;
        logInSection.style.display = "none";
        productSection.style.display = "grid";
      } else {
        error.style.display = "block";
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  function handleLogout() {
    logInSection.style.display = "block";
    productSection.style.display = "none";
    error.style.display = "none";
    UserList.style.display = "none";
  }

  async function showUsers() {
    try {
      const response = await fetch("/user", { method: "GET" });
      const users = await response.json();
      updateUsersList(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  function updateUsersList(users) {
    UserList = document.querySelector(".usersList");
    UserList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.innerText = `${user.name} - `;
      const button = document.createElement("button");
      button.innerText = "Delete";
      button.onclick = () => deleteUser(user._id, li);
      li.appendChild(button);
      UserList.appendChild(li);
    });
  }

  async function deleteUser(userId, li) {
    try {
      const response = await fetch(`/user/${userId}`, { method: "DELETE" });
      if (response.ok) {
        console.log("User deleted");
        li.remove();
      } else {
        alert("Failed to delete the user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete the user");
    }
  }

  function toggleUserForm(show) {
    const UserSection = document.querySelector(".add-show-btn");
    if (show) {
      formDiv = document.createElement("form");
      formDiv.classList.add("form-div");
      createUserForm(formDiv);
      UserSection.appendChild(formDiv);
    } else {
      UserSection.innerHTML = "";
    }
  }

  function createUserForm(form) {
    const usernameInput = document.createElement("input");
    usernameInput.placeholder = "Ange användarnamn";
    const isAdminInput = document.createElement("input");
    isAdminInput.type = "checkbox";
    const addUserButton = document.createElement("button");
    addUserButton.innerText = "Lägg till användare";
    addUserButton.disabled = true;

    form.appendChild(createLabelInputPair("Användarnamn:", usernameInput));
    form.appendChild(createLabelInputPair("Admin:", isAdminInput));
    form.appendChild(addUserButton);

    usernameInput.addEventListener("input", () => {
      addUserButton.disabled = !usernameInput.value.trim();
    });
    isAdminInput.addEventListener("change", () => {
      addUserButton.disabled = !usernameInput.value.trim();
    });
    addUserButton.addEventListener("click", (event) =>
      addUser(event, usernameInput, isAdminInput)
    );
  }

  function createLabelInputPair(labelText, inputElement) {
    const label = document.createElement("label");
    label.innerText = labelText;
    const container = document.createElement("div");
    container.appendChild(label);
    container.appendChild(inputElement);
    return container;
  }

  async function addUser(event, usernameInput, isAdminInput) {
    event.preventDefault();
    const newUser = {
      name: usernameInput.value.trim(),
      isAdmin: isAdminInput.checked,
    };

    try {
      const response = await fetch("/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("Ny användare tillagd:", await response.json());
        usernameInput.value = "";
        isAdminInput.checked = false;
        formDiv.remove();
      } else {
        console.error("Misslyckades med att lägga till användare");
      }
    } catch (error) {
      console.error("Fel vid tillägg av användare:", error);
    }
  }
});
