document.addEventListener("DOMContentLoaded", () => {
  const resetDbButton = document.querySelector("#reset-db");

  resetDbButton.addEventListener("click", async () => {
    try {
      const response = await fetch("/user/reset", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to reset database");
      }
    } catch (error) {
      console.error("Network or server error", error);
    }
  });
});
