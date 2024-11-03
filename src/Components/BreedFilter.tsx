import { useBreeds } from "../hooks/useBreeds";

interface BreedFilterProps {
  selectedBreed: string;
  onBreedChange: (breedId: string) => void;
}

export const BreedFilter = ({ selectedBreed, onBreedChange }: BreedFilterProps) => {
  const { data: breeds, isLoading, isError } = useBreeds();

  if (isLoading) {
    return <div>Loading breeds...</div>;
  }

  if (isError) {
    return <div>Error loading breeds</div>;
  }

  return (
    <div className="w-full max-w-xs mx-auto mb-8">
      <select
        value={selectedBreed}
        onChange={(e) => onBreedChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
        <option value="">All Breeds</option>
        {breeds?.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
    </div>
  );
};
