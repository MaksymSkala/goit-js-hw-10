import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const catImage = document.getElementById("cat-image");
const catDescription = document.getElementById("cat-description");

async function displayCatInfo(breedId) {
  try {
    const cat = await fetchCatByBreed(breedId);
    catImage.src = cat.url; // Встановлюємо значення атрибуту src
    catImage.alt = cat.breeds[0].name;
    catDescription.innerHTML = `
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p>Temperament: ${cat.breeds[0].temperament}</p>
    `;
  } catch (err) {
    console.error("Error fetching cat information:", err);
    // Handle error
  }
}

async function displayCatInfo(breedId) {
  try {
    const cat = await fetchCatByBreed(breedId);
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}" />
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p>Temperament: ${cat.breeds[0].temperament}</p>
    `;
  } catch (err) {
    console.error("Error fetching cat information:", err);
    error.textContent = "Oops! Something went wrong while fetching cat information.";
  } finally {
    loader.style.display = "none";
  }
}

breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  loader.style.display = "block";
  error.textContent = "";
  catInfo.innerHTML = "";
  displayCatInfo(selectedBreedId);
});

populateBreedSelect();