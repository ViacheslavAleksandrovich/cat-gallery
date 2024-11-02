import React from "react";

interface Cat {
  id: string;
  url: string;
  breeds: { name: string; description: string }[];
}

interface CatCardProps {
  cat: Cat;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img className="w-full h-48 object-cover" src={cat.url} alt={cat.breeds[0]?.name} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{cat.breeds[0]?.name}</h2>

        <button
          className={`mt-2 p-2 rounded ${
            isFavorite ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onToggleFavorite(cat.id)}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default CatCard;
