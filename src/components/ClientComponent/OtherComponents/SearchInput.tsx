import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <form className="flex items-center hover:bg-yellow-100 rounded-lg ">
      <div className="relative flex items-center w-full">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 text-gray-400 cursor-pointer z-10 "
          onClick={handleSearch}
          role="button"
          aria-label="Search"
        />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleChange}
          className="rounded-lg pl-10 px-3 py-2 border border-yellow-300 w-[330px] h-[30px] hover:bg-yellow-100" // Added hover class
        />
      </div>
    </form>
  );
}

export default SearchInput;
