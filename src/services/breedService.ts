// src/services/breedService.ts
import axios from "axios";

interface Breed {
  id: string;
  name: string;
}

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchBreeds = async () => {
  const response = await axios.get<Breed[]>("https://api.thecatapi.com/v1/breeds", {
    headers: {
      "x-api-key": API_KEY,
    },
  });
  return response.data;
};
