import axios from "axios";
import { Cat } from "../types/cat";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = import.meta.env.VITE_APP_API_HOST;

export const fetchCats = async (page: number, breedId?: string, limit: number = 10) => {
  const response = await axios.get<Cat[]>(`${API_HOST}`, {
    headers: {
      "x-api-key": API_KEY,
    },
    params: {
      page,
      limit,
      order: "DESC",
      has_breeds: 1,
      breed_ids: breedId, // Add breed filter
    },
  });
  return response.data;
};
