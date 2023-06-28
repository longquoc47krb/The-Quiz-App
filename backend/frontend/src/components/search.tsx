import React, { ChangeEvent, useState } from "react";
import { Quiz } from "../interfaces";
import Fuse from "fuse.js";

const Search: React.FC<{ data: Quiz[] }> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Quiz[]>([]);
  const [suggestions, setSuggestions] = useState<Quiz[]>([]);
  // Create the Fuse instance
  const fuse = new Fuse(data, {
    keys: ["name"], // Specify the keys to search within your data
    threshold: 0.3, // Adjust the threshold value to control the fuzziness of the search
  });
  // Handle search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);

    // Perform the search
    const results = fuse.search(value);
    setSearchResults(results.map((result) => result.item));

    const suggestions = fuse
      .search(value, { limit: 5 })
      .map((result) => result.item);
    setSuggestions(suggestions);
  };
  const handleSuggestionSelection = (suggestion: Quiz) => {
    setSearchTerm(suggestion.name);
    setSearchResults([suggestion]);
    setSuggestions([]);
  };
  console.log({ searchResults });
  return (
    <div className="group">
      <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        placeholder="Search"
        type="search"
        className="input"
        value={searchTerm}
        onChange={handleSearch}
      />
      {suggestions.length > 0 && (
        <ul className="autosuggestion">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionSelection(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
