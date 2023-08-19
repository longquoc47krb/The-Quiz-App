import Fuse from 'fuse.js';
import React, { useState } from 'react';

interface SearchProps {
  data: { name: string }[];
  keysToSearch: string[];
}

const Search: React.FC<SearchProps> = ({ data, keysToSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Fuse.FuseResult<{ name: string }>[]>(
    [],
  );

  const fuse = new Fuse(data, {
    keys: keysToSearch,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    const searchResults = fuse.search(value);
    setResults(searchResults);
  };
  console.log({ results });
  return (
    <div className="mx-4 relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="text-gray-400 p-2 border rounded w-[calc(100vw-10rem)] border-none outline-darkPrimary"
      />
      {results.length > 0 && (
        <ul className="mt-2 item-container w-[calc(100vw-10rem)] h-fit absolute z-10 bg-[#34313F] border-violet-400 border-2 p-3.5">
          {results.map((result, index) => (
            <li key={index} className="mb-1 p-2 hover:bg-[#645d7b]">
              {result.item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
