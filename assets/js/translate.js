let translateButton = document.querySelector("#translate-button");
let englishRecipe = document.querySelector(".translate");
let translatedRecipe = document.querySelector(".translation");
let scrollOption = document.querySelector("select")
let title = document.querySelector(".eng-title")
let ingredients = document.querySelector(".eng-ingredients")
let recipe = document.querySelector(".eng-recipe")
let servingSize = document.querySelector(".eng-serving")
let maxTime = document.querySelector(".eng-max-time")

//let englishRecipeIngrediant = document.querySelector(".translate-b")

let languages = [
["Mandarin", "zh-CN"],
["Hindi", "hi"],
["Spanish", "es"],
["French", "fr"],
["Arabic", "ar"],
["Bengali", "bn"],
["Russian", "ru"],
["Portuguese", "pt"],
["Indonesian", "id"],
["Urdu", "ur"],
["Japanese", "ja"],
["German", "de"],
["Punjabi", "pa"],
["Javanese", "jw"],
];

selectorConstruction()
translateButton.addEventListener("click", languagePicker)
translateButton.addEventListener("click", translatePage)
function translatePage() {
    translate(title)
    translate(ingredients)
    translate(recipe)
    translate(servingSize)
    translate(maxTime)
    
}



// This bit of code creates the language selector feature.
function selectorConstruction() {
    for (let i = 0; i < languages.length; i++) {
        const language = languages[i];
        scrollOption.innerHTML += ("<option id=" + i + ">" + language[0] + "</option>")    
    }
    console.log(scrollOption.innerHTML) 
}

// This part of the code selects the language to translate to.
function languagePicker() {
    let selectedLanguage = document.querySelector("#selector");
    languageChoice = selectedLanguage.value
    console.log(languageChoice)

    for (let i = 0; i < languages.length; i++) {
        const language = languages[i];
        if (language[0] == languageChoice) {
            languageCode = language[1] 
            console.log(languageCode)     
        }    
    }
}

// This section of code carries out the translation.


function translate(section) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", languageCode);
    encodedParams.append("text", section.textContent);
    

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'c42de5a747msh94871f1f68806c1p1333a3jsn51bcb01b10c2',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => section.textContent =(response.data.translatedText))
        .catch(err => console.error(err));  
}


