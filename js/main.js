let apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

let btn = document.querySelector(".btn");
let mealName = document.querySelector(".meal-name");
let placeholder = document.querySelector(".placeholder-img");
let thumbnail = document.querySelector(".meal-thumb");
let videoWrapper = document.querySelector(".ratio");

async function getMeal() {
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    let meal = data.meals[0];

    // Update meal name
    mealName.textContent = meal.strMeal;

    // Update image thumbnail
    thumbnail.src = meal.strMealThumb;
    thumbnail.alt = meal.strMeal;
    thumbnail.style.display = "block";

    // Hide placeholder image
    if (placeholder) placeholder.style.display = "none";

     // Show and update video
    mealVid.src = meal.strYoutube.replace("watch?v=", "embed/");
    videoWrapper.style.display = "block";


  } catch (error) {
    mealName.textContent = "Oops! Couldn't load a meal. Try again.";
    console.error("Fetch error:", error);
  }
}

btn.addEventListener("click", getMeal);
