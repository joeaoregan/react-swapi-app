import React, { useState, useEffect } from 'react';
import '../index.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Attempting to fetch Star Wars planets...");

        const response = await fetch('https://swapi.tech/api/planets/');

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log("Fetched data:", data);

        const parsedCharacters = data.results.map(item => ({
          name: item.name,
          url: item.url
        }));

        setPlanets(parsedCharacters);
      } catch (err) {
        console.error("Failed to fetch Star Wars planets:", err);
        setError(new Error(`Failed to fetch: ${err.message || "Network Error"}`));
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-yellow-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        <p className="ml-4 text-xl font-medium">Loading Star Wars planets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Error loading data!</h2>
          <p className="text-lg">Message: {error.message}</p>
          <p className="mt-2 text-sm text-gray-400">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="/*min-h-screen*/ text-center bg-gradient-to-br from-gray-900 to-gray-800 text-white font-inter p-6 sm:p-10">
    <h2 className="text-2xl sm:text-4xl font-extrabold text-yellow-400 drop-shadow-lg mb-4 rounded-xl px-4 py-2 inline-block bg-opacity-10 bg-yellow-400 backdrop-filter backdrop-blur-sm">Planets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {planets.map((planet) => (
          <div
            key={planet.url} // Using URL as a unique key
            className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border-2 border-gray-700 hover:border-yellow-500"
          >
            <h2 className="text-3xl font-bold text-yellow-300 mb-3 text-center">
              {planet.name}
            </h2>            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
