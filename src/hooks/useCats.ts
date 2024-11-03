import { useQuery } from "@tanstack/react-query";
import { fetchCats } from "../services/catService";

export const useCats = (page: number, breedId?: string) => {
  return useQuery({
    queryKey: ["cats", page, breedId],
    queryFn: () => fetchCats(page, breedId),
  });
};
