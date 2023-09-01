import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

async function populateBreedSelect() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error fetching breeds:", err);
    error.textContent = "Oops! Something went wrong while fetching breeds.";
  } finally {
    loader.style.display = "none";
  }
}

async function displayCatInfo(breedId) {
  try {
    const cat = await fetchCatByBreed(breedId);
    
    if (cat && cat.url) {
      catInfo.innerHTML = `
        <img src="${cat.url}" alt="${cat.breeds[0].name}" width="500px" height="500px" />
        <div class="cat-text">
          <h2>${cat.breeds[0].name}</h2>
          <p>${cat.breeds[0].description}</p>
          <p>Temperament: ${cat.breeds[0].temperament}</p>
        </div>
      `;
    // Приховати повідомлення про помилку, якщо воно вже видиме
    error.style.display = "none";
  } catch (err) {
    console.error("Error fetching cat information:", err);
    
    error.style.display = "block";
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