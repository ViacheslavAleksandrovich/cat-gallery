// src/components/CatGallery.tsx
import { useState } from "react";
import { useCats } from "../hooks/useCats";
import { useFavorites } from "../hooks/useFavorites";
import { Cat } from "../types/cat";
import { BreedFilter } from "./BreedFilter";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const CatGallery = () => {
  const [page, setPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { data: cats, isLoading, isError, error } = useCats(page, selectedBreed);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleBreedChange = (breedId: string) => {
    setSelectedBreed(breedId);
    setPage(1);
    setShowOnlyFavorites(false);
  };

  const filteredCats = showOnlyFavorites ? cats?.filter((cat) => isFavorite(cat.id)) : cats;

  if (isLoading) {
    return (
      <div className="text-center py-8 text-xl font-semibold text-gray-600">
        Loading adorable cats...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8 text-xl font-semibold">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BreedFilter selectedBreed={selectedBreed} onBreedChange={handleBreedChange} />

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`px-4 py-2 rounded-full ${
            showOnlyFavorites ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
          }`}>
          {showOnlyFavorites ? "Show All Cats" : "Show Favorites"}
        </button>
        <span className="text-gray-600">
          {showOnlyFavorites ? `Showing ${filteredCats?.length} favorite cats` : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCats?.map((cat: Cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 relative">
            <div className="relative pb-[66.67%]">
              <img
                src={cat.url}
                alt={cat.breeds[0]?.name || "Cat"}
                className="absolute top-0 left-0 w-full h-full object-cover"
                loading="lazy"
              />
              <button
                onClick={() => toggleFavorite(cat.id)}
                className="absolute top-2 right-2 text-2xl">
                {isFavorite(cat.id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-white" />
                )}
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {cat.breeds[0]?.name || "Unknown breed"}
              </h2>
              <p className="text-sm text-gray-600">ID: {cat.id.slice(0, 8)}...</p>
            </div>
          </div>
        ))}
      </div>

      {!showOnlyFavorites && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-blue-600">
            Previous
          </button>
          <span className="text-lg font-medium text-gray-700">Page {page}</span>
          <button
            onClick={() => setPage((old) => old + 1)}
            className="px-6 py-2 bg-blue-500 text-white rounded-full transition-colors duration-300 hover:bg-blue-600">
            Next
          </button>
        </div>
      )}
    </div>
  );
};
