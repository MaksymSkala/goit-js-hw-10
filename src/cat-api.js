import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_dITNHDPEPEVeCJCJqJNoD5Dy4Hfl0Hakt1RvfvdCeX93e1OaIn6m7ybwA1ap8ILs";

export async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (error) {
    throw error;
  }
}