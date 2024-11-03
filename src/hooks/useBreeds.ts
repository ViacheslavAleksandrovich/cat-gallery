// src/hooks/useBreeds.ts
import { useQuery } from "@tanstack/react-query";
import { fetchBreeds } from "../services/breedService";

export const useBreeds = () => {
  return useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
  });
};
