

const button = document.querySelector('#get-products')
const ul = document.querySelector('.product-list')

button.addEventListener('click', async () => {
    const response = await fetch ('/product', {
       method: 'GET'
    })
    const data = await response.json()
    console.log('Svar från servern: ', data
    )

    data.forEach(product => {
        const li = document.createElement('li')
        li.innerText = `${product.name} ... ${product.price}`
        ul.append(li)
        const bild = document.createElement('img')
         bild.src =  `${product.image}`
         li.appendChild(bild)
         bild.classList.add("bild")
    });

})