const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f45b665073mshea7f2efefe5dd96p1af0e4jsnef0745d610c7',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};



//use and event listener to take the inputted


let inputField =document.querySelector("#search-input")
let recipeName = "";
let searchBtn = document.querySelector("#search-button");
// this function captures the inputted recipe name and stores it in a variable called recipe name

searchBtn.addEventListener("click",function(event){
    event.preventDefault();
    recipeName = inputField.value;
    console.log(recipeName);

// this code request a recipe from the tasty API that matches the inputed variable called recipeName	
	fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=' + recipeName, options)
	.then(response => response.json())
	.then(function(recipeResponse){
		console.log(recipeResponse)


// this code access the cooking instruction and loops through the length of the instruction array		
let instruction = ""

 for (let index = 0; index < recipeResponse.results[0].instructions.length; index++) {

// this code adds the step number to each instruction and puts each step on a newline	
	instruction += 'Step ' +  (index+1) +' - ' + recipeResponse.results[0].instructions[index].display_text +'\n'
 }
console.log(instruction)

 // this code accesses the recipe image from the API
let recipeImage = recipeResponse.results[0].thumbnail_url;
console.log (recipeImage)

// this code accesses the number of servings
let servingSize = recipeResponse.results[0].num_servings;
console.log("number of servings = " + servingSize)

// this code accesses the cooking time (some seem to have this field missing and return null)
let recipeMaxTime = recipeResponse.results[0].total_time_minutes
console.log(recipeMaxTime)


})

})

// ('https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=carbonara', options)
// this code searches the recipe API for the name of the recipe stored in the recipeName variable



// this code returns the recipe instruction of how to make the recipe