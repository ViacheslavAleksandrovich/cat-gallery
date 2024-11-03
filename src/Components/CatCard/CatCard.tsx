import React, { useState } from "react";
import { Cat } from "../../types/cat";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface CatCardProps {
  cat: Cat;
  isFavorite: boolean;
  onToggleFavorite: (catId: string) => void;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, isFavorite, onToggleFavorite }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const breed = cat.breeds?.[0];

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(cat.id);
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div className="relative pb-[66.67%] bg-gray-200">
        <img
          src={cat.url}
          alt={breed?.name || "Cat"}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-lg transform transition-transform duration-300 hover:scale-110 z-10">
          {isFavorite ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-600 text-xl" />
          )}
        </button>

        <button
          onClick={() => setShowDetails(true)}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 shadow-lg transform transition-transform duration-300 hover:scale-110 z-10">
          <FaInfoCircle className="text-gray-600 text-xl" />
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {breed?.name || "Unknown Breed"}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {breed?.life_span && (
            <span className="px-2 py-1 bg-gray-100 rounded-full">{breed.life_span} years</span>
          )}
        </div>
      </div>

      {showDetails && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDetails(false)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={cat.url}
                alt={breed?.name || "Cat"}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white">
                <MdClose className="text-xl" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {breed?.name || "Unknown Breed"}
                </h2>
                <button
                  onClick={handleToggleFavorite}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  {isFavorite ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-600 text-xl" />
                  )}
                </button>
              </div>

              {breed && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Origin</p>
                      <p className="font-semibold">{breed.origin}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Life Span</p>
                      <p className="font-semibold">{breed.life_span} years</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Temperament</p>
                      <p className="font-semibold">{breed.temperament}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="font-semibold">{breed.weight?.metric} kg</p>
                    </div>
                  </div>

                  {breed.description && (
                    <div className="mt-6">
                      <h3 className="font-sem i-bold text-gray-800 mb-2">Description</h3>
                      <p className="text-sm text-gray-600">{breed.description}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
