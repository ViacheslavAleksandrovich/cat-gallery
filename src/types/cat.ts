export interface Breed {
  id: string;
  name: string;
  origin?: string;
  life_span?: string;
  temperament?: string;
  weight?: {
    imperial: string;
    metric: string;
  };
  description?: string;
}

export interface Cat {
  id: string;
  url: string;
  breeds: Breed[];
}
