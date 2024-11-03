export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}

export interface Breed {
  id: string;
  name: string;
}
