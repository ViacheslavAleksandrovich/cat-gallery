import React from "react";

interface FilterProps {
  breeds: string[];
  selectedBreed: string;
  onBreedChange: (breed: string) => void;
  showFavorites: boolean;
  onToggleShowFavorites: () => void;
}

const Filter: React.FC<FilterProps> = ({
  breeds,
  selectedBreed,
  onBreedChange,
  showFavorites,
  onToggleShowFavorites,
}) => {
  return (
    <div className="mb-4">
      <select
        value={selectedBreed}
        onChange={(e) => onBreedChange(e.target.value)}
        className="p-2 border border-gray-300 rounded">
        <option value="All">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      <button className="ml-4 p-2 bg-blue-500 text-white rounded" onClick={onToggleShowFavorites}>
        {showFavorites ? "Show All Cats" : "Show Favorites"}
      </button>
    </div>
  );
};

export default Filter;
