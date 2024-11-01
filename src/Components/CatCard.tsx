interface Cat {
  id: number;
  url: string;
  name: string;
  description: string;
}

export const CatCard = ({ url, name, description }: Cat) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img className="w-full h-48 object-cover" src={url} alt={name} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};
