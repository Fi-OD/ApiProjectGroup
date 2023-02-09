// select the input field, search button and random recipe button
let inputField = document.querySelector("#search-input")
let recipeName = "";
let searchBtn = document.querySelector("#search-button");
let randomRecipeBtn = document.querySelector("#random-button")

/** The getRecipe Function requests information from the Tasty API for a specified recipe:
* - Name
* - Ingredients
* - Instructions
* - Serving size
* - Cooking time*/

function getRecipe(recipeName) {

	// Request a recipe from the Tasty API based on the inputted recipe name

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'f45b665073mshea7f2efefe5dd96p1af0e4jsnef0745d610c7',
			'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
		}
	};

	fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=' + recipeName, options)
		.then(response => response.json())
		.then(function (recipeResponse) {
			console.log(recipeResponse)

			let instruction = ""
			let ingredients = ""
			let recipeSearchName = ""
			let servingSize = ""
			let recipeMaxTime = ""

			// If only one recipe is returned from the search, access its details

			if (recipeResponse.results[0].recipes === undefined) {

				// Access the recipe name
				recipeSearchName = recipeResponse.results[0].name;
				let nameTarget = document.querySelector("#recipeName");
				nameTarget.innerHTML = recipeSearchName;
				//console.log(recipeSearchName)

				// Access the ingredients 
				for (let index = 0; index < recipeResponse.results[0].sections[0].components.length; index++) {
					ingredients += ' - ' + recipeResponse.results[0].sections[0].components[index].raw_text + '\n'
				}
				let ingredientTarget = document.querySelector("#ingredients");
				ingredientTarget.innerHTML = ingredients;
				//console.log(ingredients)

				// Access the cooking instructions
				for (let index = 0; index < recipeResponse.results[0].instructions.length; index++) {
					instruction += 'Step ' + (index + 1) + ' - ' + recipeResponse.results[0].instructions[index].display_text + '\n'
				}
				let instructionTarget = document.querySelector("#instruction");
				instructionTarget.innerHTML = instruction;
				//console.log(instruction)

				// Access the recipe image
				let recipeImage = recipeResponse.results[0].thumbnail_url;
				let recipeImageTarget = document.querySelector("#recipeImage");
				let newRecipeImage = document.createElement("img");
				newRecipeImage.src = recipeImage;
				recipeImageTarget.appendChild = newRecipeImage;
				//console.log(recipeImage)

				// Access number of servings
				servingSize = recipeResponse.results[0].num_servings;
				let servingSizeTarget = document.querySelector("#servingSize");
				servingSizeTarget.innerHTML = servingSize;
				//console.log("number of servings = " + servingSize)

				// Access the cooking time
				let recipeMaxTime = recipeResponse.results[0].total_time_minutes
				let recipeMaxTimeTarget = document.querySelector("#maxTime");
				if (recipeResponse.results[0].total_time_minutes === null) {

					recipeMaxTimeTarget.innerHTML = "1 hour"
				}
				else {
					recipeMaxTimeTarget.innerHTML = recipeMaxTime
				}
				//console.log(recipeMaxTime)
			}
			// Display an error message if no results are found
			else if (recipeResponse.results.length === 0) {
				alert("We have not found a recipe match. Please try again.")
			}

			// If multiple recipes are returned from the search, access its details

			else {
				// Access the name of the recipe
				recipeSearchName = recipeResponse.results[0].recipes[0].name;
				let nameTarget = document.querySelector("#recipeName");
				nameTarget.innerHTML = recipeSearchName;
				//console.log(recipeSearchName)

				// Access the ingredients 
				for (let index = 0; index < recipeResponse.results[0].recipes[0].sections[0].components.length; index++) {
					ingredients += ' - ' + recipeResponse.results[0].recipes[0].sections[0].components[index].raw_text + '\n'
				}
				let ingredientTarget = document.querySelector("#ingredients");
				ingredientTarget.innerHTML = ingredients;
				//console.log(ingredients)

				// Access the cooking instruction 
				for (let i = 0; i < recipeResponse.results[0].recipes[0].instructions.length; i++) {
					instruction += 'Step ' + (i + 1) + ' - ' + recipeResponse.results[0].recipes[0].instructions[i].display_text + '\n'
				}
				let instructionTarget = document.querySelector("#instruction");
				instructionTarget.innerHTML = instruction;
				//console.log(instruction)

				// Access the recipe image 
				let recipeImage = recipeResponse.results[0].recipes[0].thumbnail_url;
				let recipeImageTarget = document.querySelector("#recipeImage");
				let newRecipeImage = document.createElement("img");
				newRecipeImage.src = recipeImage;
				recipeImageTarget.appendChild = newRecipeImage;
				//console.log(recipeImage)

				// Access the number of servings
				servingSize = recipeResponse.results[0].recipes[0].num_servings;
				let servingSizeTarget = document.querySelector("#servingSize");
				servingSizeTarget.innerHTML = servingSize;
				//console.log("number of servings = " + servingSize)

				// Access the cooking time
				recipeMaxTime = recipeResponse.results[0].recipes[0].total_time_minutes
				let recipeMaxTimeTarget = document.querySelector("#maxTime");
				if (recipeResponse.results[0].total_time_minutes === null) {

					recipeMaxTimeTarget.innerHTML = "1 hour"
				}
				else {
					recipeMaxTimeTarget.innerHTML = recipeMaxTime
				}
				//console.log(recipeMaxTime)
			}
		})


}


// This code is for the recipe search button

searchBtn.addEventListener("click", function (event) {
	event.preventDefault();
	recipeName = inputField.value;
	console.log(recipeName);

	getRecipe(recipeName)

})

// Attaches an event listener to the Random Recipe button to handle click events

randomRecipeBtn.addEventListener("click", function (event) {
	event.preventDefault();

	// Calls the getRandomObjectFromArray function with the input array as an argument
	function getRandomObjectFromArray(array) {
		let randomIndex = Math.floor(Math.random() * array.length);
		let randomObject = array[randomIndex];
		return randomObject;
	}

	let randomRecipeNames = [
		"Chicken Alfredo",
		"Beef Stroganoff",
		"Spaghetti Bolognese",
		"Grilled Cheese Sandwich",
		"Tomato Soup",
		"Macaroni and Cheese",
		"Chilli Con Carne",
		"Tacos",
		"Fried Rice",
		"Shepherds Pie",
		"Fried Chicken",
		"Pork Chops",
		"Baked Salmon",
		"Beef Tacos",
		"Lobster Bisque",
		"Beef and Broccoli Stir Fry",
		"Beef Burrito",
		"Caesar Salad",
		"Quiche Lorraine",
		"Baked Ziti",
		"Pancakes",
		"French Toast",
		"Scrambled Eggs",
		"Huevos Rancheros",
		"Bagel and Cream Cheese",
		"Croissant",
		"Sushi Rolls",
		"Pad Thai",
		"Shrimp Scampi",
		"Seafood Paella",
		"Clam Chowder",
		"Mussels in White Wine Sauce",
		"Beef Wellington",
		"Roast Beef",
		"Turkey and Stuffing",
		"Stuffed Bell Peppers",
		"Vegetable Stir Fry",
		"Eggplant Parmesan",
		"Ratatouille",
		"Mushroom Risotto",
		"Chicken Parmesan",
		"Beef Enchiladas",
		"Carrot Cake",
		"Cheesecake",
		"Apple Pie",
		"Brownies",
		"Chocolate Chip Cookies",
		"Banana Bread",
		"Lemon Bars"
	]

	let recipeName = getRandomObjectFromArray(randomRecipeNames);
	console.log(recipeName);

	getRecipe(recipeName)
})

// Save the name of the searched recipes to local storage
function saveItem(recipeName) {
	// Get the current array of items from local storage (or an empty array if it doesn't exist)
	let recipeNames = JSON.parse(localStorage.getItem("items")) || [];

	// Add the new item to the array
	recipeNames.push(recipeName);

	// Save the updated array to local storage
	localStorage.setItem("items", JSON.stringify(items));
}

// Retrieve all items from local storage
function getItems() {
	return JSON.parse(localStorage.getItem("items")) || [];
}

