let inputField = document.querySelector("#search-input")
let recipeName = "";
let searchBtn = document.querySelector("#search-button");
let randomRecipeBtn = document.querySelector("#random-button")

// The getRecipe Function requests the following information from the restaurant API from a specified recipe:
// name, ingredients, instructions, serving size and time

function getRecipe(recipeName) {

	// this code request a recipe from the tasty API that matches the inputted variable called recipeName	

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

			// This if statement access the detail of a recipe when only one recipe is returned from your recipe search

			if (recipeResponse.results[0].recipes === undefined) {

				// this code access the recipe name
				recipeSearchName = recipeResponse.results[0].name;
				let nameTarget = document.querySelector("#recipeName");
				nameTarget.innerHTML = recipeSearchName;
				//console.log(recipeSearchName)

				// this code access the ingredients 
				for (let index = 0; index < recipeResponse.results[0].sections[0].components.length; index++) {
					ingredients += ' - ' + recipeResponse.results[0].sections[0].components[index].raw_text + '\n'
				}
				let ingredientTarget = document.querySelector("#ingredients");
				ingredientTarget.innerHTML = ingredients;
				//console.log(ingredients)

				// this code access the cooking instruction and loops through the length of the instruction array
				for (let index = 0; index < recipeResponse.results[0].instructions.length; index++) {
					instruction += 'Step ' + (index + 1) + ' - ' + recipeResponse.results[0].instructions[index].display_text + '\n'
				}
				let instructionTarget = document.querySelector("#instruction");
				instructionTarget.innerHTML = instruction;
				//console.log(instruction)

				// this code accesses the recipe image from the API
				let recipeImage = recipeResponse.results[0].thumbnail_url;
				let recipeImageTarget = document.querySelector("#recipeImage");
				let newRecipeImage = document.createElement("img");
				newRecipeImage.src = recipeImage;
				recipeImageTarget.appendChild = newRecipeImage;				
				//console.log(recipeImage)

				// this code accesses the number of servings
				servingSize = recipeResponse.results[0].num_servings;
				let servingSizeTarget = document.querySelector("#servingSize");
				servingSizeTarget.innerHTML = servingSize;		
				//console.log("number of servings = " + servingSize)

				// this code accesses the cooking time (some seem to have this field missing and return null)
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
			// This Else if displays an error message if no results are found
			else if (recipeResponse.results === [0]) {
				console.log("typo")
			}
			// This Else statement access the first recipe when multiple recipes are returned for the same dish.

			else {
				// This code access the name of the recipe
				recipeSearchName = recipeResponse.results[0].recipes[0].name;
				let nameTarget = document.querySelector("#recipeName");
				nameTarget.innerHTML = recipeSearchName;
				//console.log(recipeSearchName)

				// this code access the ingredients 
				for (let index = 0; index < recipeResponse.results[0].recipes[0].sections[0].components.length; index++) {
					ingredients += ' - ' + recipeResponse.results[0].recipes[0].sections[0].components[index].raw_text + '\n'
				}
				let ingredientTarget = document.querySelector("#ingredients");
				ingredientTarget.innerHTML = ingredients;
				//console.log(ingredients)

				// this code access the cooking instruction and loops through the length of the instruction array
				for (let i = 0; i < recipeResponse.results[0].recipes[0].instructions.length; i++) {
					instruction += 'Step ' + (i + 1) + ' - ' + recipeResponse.results[0].recipes[0].instructions[i].display_text + '\n'
				}
				let instructionTarget = document.querySelector("#instruction");
				instructionTarget.innerHTML = instruction;
				//console.log(instruction)
				
				// this code accesses the recipe image from the API
				let recipeImage = recipeResponse.results[0].recipes[0].thumbnail_url;
				let recipeImageTarget = document.querySelector("#recipeImage");
				let newRecipeImage = document.createElement("img");
				newRecipeImage.src = recipeImage;
				recipeImageTarget.appendChild = newRecipeImage;	
				//console.log(recipeImage)

				// this code accesses the number of servings
				servingSize = recipeResponse.results[0].recipes[0].num_servings;
				let servingSizeTarget = document.querySelector("#servingSize");
				servingSizeTarget.innerHTML = servingSize;	
				//console.log("number of servings = " + servingSize)

				// this code accesses the cooking time (some seem to have this field missing and return null)
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

// This code is for the Random Recipe Button

randomRecipeBtn.addEventListener("click", function (event) {
	event.preventDefault();

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