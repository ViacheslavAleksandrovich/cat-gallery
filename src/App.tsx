import React, { useEffect } from "react";
import useCatStore from "./store/useCatStore";
import { getCats } from "./api/axios";

const App: React.FC = () => {
  const { cats, addCat } = useCatStore();

  useEffect(() => {
    const fetchCats = async () => {
      const data = await getCats();
      data.forEach((cat) => addCat(cat));
    };

    fetchCats();
  }, [addCat]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Cats Gallery</h1>
        <p className="text-lg text-gray-600">A collection of adorable cats</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cats.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img className="w-full h-48 object-cover" src={cat.url} alt={cat.breeds[0]?.name} />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{cat.breeds[0]?.name}</h2>
              <p className="text-gray-600">{cat.breeds[0]?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
