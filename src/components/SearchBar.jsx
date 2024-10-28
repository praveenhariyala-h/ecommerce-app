import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { SearchIcon } from '@heroicons/react/outline';
//import algoliasearch from 'algoliasearch/lite';

// Initialize Algolia (optional)
// const searchClient = algoliasearch(
//   'YOUR_ALGOLIA_APP_ID',
//   'YOUR_ALGOLIA_SEARCH_KEY'
// );

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Basic debounced search
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      onSearch(searchTerm);
    }, 300),
    []
  );

  // Algolia search (optional)
//   const performAlgoliaSearch = useCallback(
//     debounce(async (searchTerm) => {
//       if (!searchTerm) {
//         setSuggestions([]);
//         return;
//       }

//       try {
//         const index = searchClient.initIndex('products');
//         const { hits } = await index.search(searchTerm);
//         setSuggestions(hits);
//       } catch (error) {
//         console.error('Algolia search error:', error);
//       }
//     }, 300),
//     []
//   );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
    //performAlgoliaSearch(value); // Optional: Remove if not using Algolia
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
     

      </div>

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.objectID}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setQuery(suggestion.title);
                setSuggestions([]);
                onSearch(suggestion.title);
              }}
            >
              <div className="flex items-center">
                <img
                  src={suggestion.thumbnail}
                  alt={suggestion.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {suggestion.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${suggestion.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
