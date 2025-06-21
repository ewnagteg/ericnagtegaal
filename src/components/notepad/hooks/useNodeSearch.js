import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

export default function useNodeSearch(nodes) {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [fuse, setFuse] = useState(null);


    useEffect(() => {
        if (nodes.length > 0) {
            const newFuse = new Fuse(nodes, {
                keys: ["data.notes", "data.label"],
                threshold: 0.2,
                includeMatches: true
            });
            setFuse(newFuse);
        }
    }, [nodes]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        
        if (fuse && value) {
            setSearchResults(fuse.search(value, { limit: 3 }));
        } else {
            setSearchResults([]);
        }
    };

    const resetSearch = () => {
        setSearchValue("");
        setSearchResults([]);
    };

    return {
        searchValue,
        searchResults,
        fuse,
        handleSearch,
        resetSearch
    };
}