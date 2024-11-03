import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CatGallery } from "./Pages/CatGallery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Cat Gallery</h1>
          </div>
        </header>
        <main>
          <CatGallery />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
