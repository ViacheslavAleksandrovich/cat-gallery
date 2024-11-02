import React from "react";

interface BreedFilterProps {
  breeds: string[];
  selectedBreed: string;
  onBreedChange: (breed: string) => void;
}

const BreedFilter: React.FC<BreedFilterProps> = ({ breeds, selectedBreed, onBreedChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="breed-select" className="mr-2 text-lg">
        Filter by breed:
      </label>
      <select
        id="breed-select"
        value={selectedBreed}
        onChange={(e) => onBreedChange(e.target.value)}
        className="p-2 border border-gray-300 rounded">
        <option value="All">All</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedFilter;
