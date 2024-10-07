<b>Leksaksaffär API</b>
Välkommen till dokumentationen för Leksaksaffärens REST API. Detta API hanterar produkter, användare och varukorgar för en online-leksaksaffär. Här hittar du detaljer om hur du kan integrera API
för att interagera med butikens resurser.


==Nedan visas objektstrukturen i databasen:==
```js
Carts {
  userId?: ObjectId;
  productId?: ObjectId;
  amount: number;
}

Products {
  _id?: ObjectId;
  name: string;
  price: number;
  image: string;
  amountInStock: number;
}

Users {
  _id?: ObjectId;
  name: string;
  isAdmin: boolean;
}
```

==Hämta alla produkter (GET /product)==
Hämtar en lista över alla leksaker tillgängliga i butiken.
```js
const response = await fetch("/product", {
    method: "GET",
  });
  const data = await response.json();
```

==Hämta specifik produkt (GET /product/)==
Hämtar information om en specifik produkt baserat på produktens unika ID.

```js
const response = await fetch("/product/6702d8f4a76aa19c92df852c", {
    method: "GET",
  });
  const data = await response.json();
```

==Lägg till ny produkt i databasen (POST /product)==

```js
const response = await fetch("/product", {
        method: "POST",}
	const data = await response.json();)
```


==Uppdatera en produkt (PUT /product/)==

```js
const response = await fetch(`/product/${productId}`, {
        method: "PUT",}
const data = await response.json();)
``` 

==Ta bort en produkt från databasen (DELETE /product/)==

```js
const response = await fetch(`/product/${productId}`, {
      method: "DELETE",}
const data = await response.json();)
```

Dessa funktioner fungerar också för users och cart. 
Ersätt /product i url,en med /cart eller /users och uppdatera till aktuell objektstruktur.


Vi hoppas att detta API hjälper dig att skapa en fantastisk leksaksbutik. 
<b>Lycka till!</b>

