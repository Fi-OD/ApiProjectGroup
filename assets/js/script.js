

/////////////////THE FOLLOWING CODE IS FOR THE RECIPE SEARCH SECTION/////////////////////

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f45b665073mshea7f2efefe5dd96p1af0e4jsnef0745d610c7',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

//use and event listener to take the inputted


let inputField = document.querySelector("#search-input")
let recipeName = "";
let searchBtn = document.querySelector("#search-button");
// this function captures the inputted recipe name and stores it in a variable called recipe name

searchBtn.addEventListener("click", function (event) {
	event.preventDefault();
	recipeName = inputField.value;
	console.log(recipeName);

	// this code request a recipe from the tasty API that matches the inputed variable called recipeName	
	fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=' + recipeName, options)
		.then(response => response.json())
		.then(function (recipeResponse) {
			console.log(recipeResponse)


			// this code access the cooking instruction and loops through the length of the instruction array		
			let instruction = ""

			for (let index = 0; index < recipeResponse.results[0].instructions.length; index++) {

				// this code adds the step number to each instruction and puts each step on a newline	
				instruction += 'Step ' + (index + 1) + ' - ' + recipeResponse.results[0].instructions[index].display_text + '\n'
			}
			console.log(instruction)

			// this code accesses the recipe image from the API
			let recipeImage = recipeResponse.results[0].thumbnail_url;
			console.log(recipeImage)

			// this code accesses the number of servings
			let servingSize = recipeResponse.results[0].num_servings;
			console.log("number of servings = " + servingSize)

			// this code accesses the cooking time (some seem to have this field missing and return null)
			let recipeMaxTime = recipeResponse.results[0].total_time_minutes
			console.log(recipeMaxTime)


		})

})
/////////////////////END OF RECIPE SEARCH CODE SECTION //////////////////////////////////////////////


/////////////// THE BELOW CODE IS FOR THE RANDOM RECIPE GENERATOR AND IS WIP///////////////


// This Code returns a random recipe when a button is pressed

let randomRecipeBtn = document.querySelector("#random-button");
// this function captures the inputted recipe name and stores it in a variable called recipe name

randomRecipeBtn.addEventListener("click", function (event) {
	event.preventDefault();

	function getRandomObjectFromArray(array) {
		let randomIndex = Math.floor(Math.random() * array.length);
		let randomObject = array[randomIndex];
		return randomObject;
	}

	let cookingIngredients = [
		"apple",
		"sugar",
		"oranges",
		"eggs",
		"tea",
		"butter",
		"milk",
		"eggs",
		"vanilla",
		"chocolate",
		"rosemary",
		"sage",
		"bread",
		"olives",
		"garlic",
		"onion",
		"beef",
		"tomatoes",
		"prawns",
		"oregano",
		"basil",
		"chicken",
		"cod",
		"rice",
		"beans",
		"salsa",
		"cheddar",
		"lettuce",
		"tortilla",
		"avocado",
		"cream"
	];

	let randomIngredient = getRandomObjectFromArray(cookingIngredients);
	console.log(randomIngredient);

	// this code request a random recipe from the tasty API 
	fetch('https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=' + randomIngredient, options)
		.then(response => response.json())
		.then(function (randomRecipeResponse) {
			console.log(randomRecipeResponse)

			// this code console logs the random recipe name		
			let randomRecipeName = randomRecipeResponse.results[0].display;
			// console.log(randomRecipeName);


			// this code request the random recipe from the tasty API that matches the inputed variable called recipeName	
			fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=' + randomRecipeName, options)
				.then(response => response.json())
				.then(function (recipeResponse) {
					console.log(recipeResponse)

					// this code console logs the description of the random recipe

					let randomRecipeDescription = "";
					randomRecipeDescription = recipeResponse.results[0].description;
					console.log(randomRecipeDescription);


					// this code access the cooking instruction fof the random recipe and loops through the length of the instruction array		
					let instruction = ""

					for (let index = 0; index < recipeResponse.results[0].instructions.length; index++) {

						// this code adds the step number to each instruction and puts each step on a newline	
						instruction += 'Step ' + (index + 1) + ' - ' + recipeResponse.results[0].instructions[index].display_text + '\n'
					}
					console.log(instruction)

					// this code accesses the random recipe image from the API
					let recipeImage = recipeResponse.results[0].thumbnail_url;
					console.log(recipeImage)

					// this code accesses the number of servings for the random recipe
					let servingSize = recipeResponse.results[0].num_servings;
					console.log("number of servings = " + servingSize)

					// this code accesses the cooking time for the random recipe(some seem to have this field missing and return null)
					let recipeMaxTime = recipeResponse.results[0].total_time_minutes
					console.log(recipeMaxTime)


				})

		})

})

///////////////////// END of CODE FOR THE RANDOM RECIPE GENERATOR ///////////////////////////