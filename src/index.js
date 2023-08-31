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
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}" />
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
      <p>Temperament: ${cat.breeds[0].temperament}</p>
    `;

    const catImage = document.querySelector(".cat-image");
    catImage.style.width = "200px";
    catImage.style.height = "200px";
    catImage.style.objectFit = "cover";
    catImage.style.maxWidth = "100%";
    catImage.style.marginRight = "20px";
  }

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

error.style.display = "none";
populateBreedSelect();
