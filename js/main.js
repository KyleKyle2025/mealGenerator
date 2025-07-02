const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const btn = document.querySelector(".btn");
const mealName = document.querySelector(".meal-name");
const placeholder = document.querySelector(".placeholder-img");
const thumbnail = document.querySelector(".meal-thumb");
const videoWrapper = document.querySelector(".ratio");
const mealVid = document.querySelector(".meal-video");

async function getMeal() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const meal = data.meals[0];

    // Update meal name
    mealName.textContent = meal.strMeal;

    // Show real meal image
    thumbnail.src = meal.strMealThumb;
    thumbnail.alt = meal.strMeal;
    thumbnail.style.display = "block";

    // Hide placeholder
    if (placeholder) placeholder.style.display = "none";

    // Embed YouTube video if available
    if (meal.strYoutube && meal.strYoutube.includes("watch?v=")) {
      const embedUrl = meal.strYoutube.replace("watch?v=", "embed/");
      mealVid.src = embedUrl;
      videoWrapper.style.display = "block";
    } else {
      mealVid.src = "";
      videoWrapper.style.display = "none";
    }

  } catch (error) {
    mealName.textContent = "Oops! Couldn't load a meal. Try again.";
    console.error("Fetch error:", error);
  }
}

btn.addEventListener("click", getMeal);
