let apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

let btn = document.querySelector(".btn");
let mealVid = document.querySelector(".meal-video");
let mealName = document.querySelector(".meal-name");
let placeholder = document.querySelector(".placeholder-img");
let videoWrapper = document.querySelector(".ratio");

async function getMeal() {
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    let meal = data.meals[0];

    // Update meal name
    mealName.textContent = meal.strMeal;

    // Hide placeholder image
    if (placeholder) placeholder.style.display = "none";

    // Check if the video exists and embed it properly
    if (meal.strYoutube && meal.strYoutube.includes("watch?v=")) {
      const embedUrl = meal.strYoutube.replace("watch?v=", "embed/");
      mealVid.src = embedUrl;
      videoWrapper.style.display = "block";
    } else {
      // Hide video if not available
      mealVid.src = "";
      videoWrapper.style.display = "none";
    }

  } catch (error) {
    mealName.textContent = "Oops! Couldn't load a meal. Try again.";
    console.error("Fetch error:", error);
  }
}

btn.addEventListener("click", getMeal);
