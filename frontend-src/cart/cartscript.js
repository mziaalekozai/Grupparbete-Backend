const cartButton = document.querySelector(".cart-btn");
const cartSection = document.querySelector(".cart-section");
const toySection = document.querySelector(".product-section");
const backButton = document.querySelector(".back-btn");
const getAllButton = document.querySelector(".get-all-btn");
const ul = document.querySelector(".cart-list");


cartButton.addEventListener("click", () => {
	toySection.style.display = "none";
	cartSection.style.display = "block";
})


backButton.addEventListener("click", () => {
	toySection.style.display = "grid"
	cartSection.style.display = "none";
})

getAllButton.addEventListener("click", async () => {
	const response = await fetch('/cart', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från servern: ', data)
	// [ {category, id, name, price} ]

	data.forEach(cart => {
		const li = document.createElement('li')
		li.innerText = `${cart.amount}`
		ul.append(li)
	})
	

})