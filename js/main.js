let apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

let btn = document.querySelector(".btn");
let mealName = document.querySelector(".meal-name");
let placeholder = document.querySelector(".placeholder-img");
let thumbnail = document.querySelector(".meal-thumb");
let mealVid = document.querySelector(".meal-video");
let videoWrapper = document.querySelector(".ratio");
let ingredientList = document.getElementById("ingredient-list");
let instructions = document.getElementById("instructions");

async function getMeal() {
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    let meal = data.meals[0];

   
    mealName.textContent = meal.strMeal;

    // Update image thumbnail
    thumbnail.src = meal.strMealThumb;
    thumbnail.alt = meal.strMeal;
    thumbnail.style.display = "block";

    
    if (placeholder) placeholder.style.display = "none";

    
    if (meal.strYoutube && meal.strYoutube.includes("watch?v=")) {
      const embedUrl = meal.strYoutube.replace("watch?v=", "embed/");
      mealVid.src = embedUrl;
      videoWrapper.style.display = "block";
    } else {
      mealVid.src = "";
      videoWrapper.style.display = "none";
    }

    ingredientList.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
      let ingredient = meal[`strIngredient${i}`];
      let measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${ingredient} – ${measure}`;
        ingredientList.appendChild(li);
      }
    }

    
    instructions.textContent = meal.strInstructions;

  } catch (error) {
    mealName.textContent = "Oops! Couldn't load a meal. Try again.";
    console.error("Fetch error:", error);
  }
}

btn.addEventListener("click", getMeal);
