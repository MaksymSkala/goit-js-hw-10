import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = new SlimSelect({
  select: ".breed-select"
});

const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

async function populateBreedSelect() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      breedSelect.add(breed.id, breed.name);
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
    catInfo.querySelector(".cat-info-img").innerHTML = `<img src="${cat.url}" alt="${cat.breeds[0].name}" />`;
    catInfo.querySelector(".cat-info-text").innerHTML = `
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

breedSelect.data.onChange = () => {
  const selectedBreedId = breedSelect.selected();
  loader.style.display = "block";
  error.textContent = "";
  catInfo.querySelector(".cat-info-img").innerHTML = "";
  catInfo.querySelector(".cat-info-text").innerHTML = "";
  displayCatInfo(selectedBreedId);
};

error.style.display = "none";
populateBreedSelect();