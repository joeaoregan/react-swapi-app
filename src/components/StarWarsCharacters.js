import React, { useState, useEffect } from 'react';
import '../index.css';

// Main App component
function App() {
  // State to store the fetched Star Wars characters
  const [characters, setCharacters] = useState([]);
  // State to manage the loading status of the API call
  const [loading, setLoading] = useState(true);
  // State to store any error that might occur during the API call
  const [error, setError] = useState(null);

  // useEffect hook to perform data fetching when the component mounts
  useEffect(() => {
    // Asynchronous function to fetch data from the SWAPI
    const fetchCharacters = async () => {
      try {
        // Set loading to true before starting the fetch
        setLoading(true);
        setError(null); // Clear any previous errors
        console.log("Attempting to fetch Star Wars characters...");

        // Using an alternative SWAPI endpoint (swapi.tech) as swapi.dev sometimes encounters network issues.
        // The /people/ endpoint on swapi.tech returns a list of objects with 'name' and 'url' directly.
        // To get full details (height, mass, etc.), individual requests to each character's URL are needed,
        // which is a more complex implementation for a simple display.
        // For this example, we will only display the 'name' and 'url' available from the initial fetch.
        const response = await fetch('https://swapi.tech/api/people/');

        // Check if the network response was successful (status code 200-299)
        if (!response.ok) {
          // If not successful, throw an error with the status
          const errorText = await response.text(); // Get more details if available
          throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("Fetched data:", data);

        // SWAPI.tech's /people/ endpoint directly returns objects with 'name' and 'url'
        // within the 'results' array. It does NOT contain 'properties' at this level.
        // We parse the data to extract the necessary fields for display.
        const parsedCharacters = data.results.map(item => ({
          name: item.name,
          url: item.url
          // Note: Full details like height, mass, gender, hair_color
          // require a separate fetch to each character's individual URL (item.url).
          // For simplicity in this example, we are only displaying 'name'.
        }));

        setCharacters(parsedCharacters);
      } catch (err) {
        // Catch any errors that occur during the fetch operation (e.g., network errors, CORS issues)
        console.error("Failed to fetch Star Wars characters:", err);
        setError(new Error(`Failed to fetch: ${err.message || "Network Error"}`)); // Provide a more user-friendly error
      } finally {
        // This block always runs, regardless of success or failure
        setLoading(false); // Set loading to false once the operation completes
      }
    };

    // Call the fetchCharacters function when the component mounts
    fetchCharacters();
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  // --- Conditional Rendering based on loading and error states ---

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-yellow-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        <p className="ml-4 text-xl font-medium">Loading Star Wars characters...</p>
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

  // --- Render the fetched data ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-inter p-6 sm:p-10">
      <header className="text-center mb-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 drop-shadow-lg mb-4 rounded-xl px-4 py-2 inline-block bg-opacity-10 bg-yellow-400 backdrop-filter backdrop-blur-sm">
          Star Wars Characters
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300">
          A galaxy of heroes, villains, and droids awaits.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <div
            key={character.url} // Using URL as a unique key
            className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border-2 border-gray-700 hover:border-yellow-500"
          >
            <h2 className="text-3xl font-bold text-yellow-300 mb-3 text-center">
              {character.name}
            </h2>
            {/* Commented out the detailed properties as they are not available directly from
              the initial /api/people/ endpoint on swapi.tech.
              To display these, each character's individual URL would need to be fetched.
            */}
            {/*
            <div className="text-lg text-gray-300 w-full">
              <p className="flex justify-between items-center py-1 border-b border-gray-700 last:border-b-0">
                <span className="font-semibold">Height:</span>
                <span className="text-yellow-200">{character.height} cm</span>
              </p>
              <p className="flex justify-between items-center py-1 border-b border-gray-700 last:border-b-0">
                <span className="font-semibold">Mass:</span>
                <span className="text-yellow-200">{character.mass} kg</span>
              </p>
              <p className="flex justify-between items-center py-1 border-b border-gray-700 last:border-b-0">
                <span className="font-semibold">Gender:</span>
                <span className="text-yellow-200 capitalize">{character.gender}</span>
              </p>
              <p className="flex justify-between items-center py-1">
                <span className="font-semibold">Hair Color:</span>
                <span className="text-yellow-200 capitalize">{character.hair_color}</span>
              </p>
            </div>
            */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
