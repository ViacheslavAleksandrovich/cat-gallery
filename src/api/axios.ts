import axios from "axios";
import { CatApiResponse } from "./ApiInterface";

const ApiKey: string = import.meta.env.VITE_API_KEY;
const ApiHost: string = import.meta.env.VITE_APP_API_HOST;
const limit: number = 20;

export const getCats = async (): Promise<CatApiResponse[]> => {
  const response = await axios.get<CatApiResponse[]>(
    `${ApiHost}?limit=${limit}&has_breeds=1&api_key=${ApiKey}`
  );
  return response.data.map((cat) => ({
    id: cat.id,
    url: cat.url,
    breeds:
      cat.breeds.length > 0
        ? cat.breeds
        : [{ name: "Unknown", description: "No description available" }],
  }));
};
