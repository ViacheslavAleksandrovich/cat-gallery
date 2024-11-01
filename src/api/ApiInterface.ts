export interface Breed {
  name: string;
  description: string;
}

export interface CatApiResponse {
  id: string;
  url: string;
  breeds: Breed[];
}
