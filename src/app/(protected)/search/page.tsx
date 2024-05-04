'use client';

import React, { useState, useEffect, useRef } from 'react';

const SearchPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<{Id: string, Name: string, NomborAhli: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedResultIndex, setSelectedResultIndex] = useState<number>(-1);
    const resultsRef = useRef<HTMLUListElement>(null);

    const handleSearch = async (searchInput: string) => {
        if (!searchInput || searchInput.length < 2) return setSearchResults([]);

        const response = await fetch(`/api/search?searchInput=${encodeURIComponent(searchInput)}`);
        const results = await response.json();
        setSearchResults(results);
        setSelectedResultIndex(-1);
    };

    const handleResultClick = async (result: any) => {
        console.log('selectedResultIndex', searchResults[selectedResultIndex]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (searchResults.length === 0) return;

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedResultIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1));
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedResultIndex((prevIndex) => (prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0));
        }
    };

    useEffect(() => {
        if (selectedResultIndex !== -1 && resultsRef.current) {
            resultsRef.current.children[selectedResultIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [selectedResultIndex]);

    return (
        <div className="flex flex-col items-center fixed top-20 left-0 right-0 bottom-0">
            <div className="flex">
                <input
                    type="text"
                    id="searchInput"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    placeholder="Enter search term"
                    className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={() => handleSearch(searchTerm)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                >
                    Search
                </button>
            </div>
            <div className="mt-4">
                {searchResults.length > 0 && (
                    <table
                        className="bg-white border border-gray-300 rounded shadow-md"
                    >
                        <tbody>
                            {searchResults.map((result, index) => (
                                <tr
                                    key={result.Id}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            console.log('key ', e.key);
                                            handleResultClick(result);
                                        }
                                    }}
                                    onClick={() => handleResultClick(result)}
                                    className={`cursor-pointer hover:bg-gray-100 ${
                                        index === selectedResultIndex ? 'bg-gray-100' : ''
                                    }`}
                                >
                                    <td className="px-4 py-2">{result.Name}</td>
                                    <td className="px-4 py-2">{result.NomborAhli}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SearchPage;