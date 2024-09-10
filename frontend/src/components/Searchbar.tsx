import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

import '../styles/SearchBar.scss';

interface SearchbarProps {
  onSearchResults: (
    results: { categories: any[]; recipes: any[] },
    noResults: boolean,
    searchInitiated: boolean
  ) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allRecipes, setAllRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoryResponse, recipeResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/categories/'),
          axios.get('http://127.0.0.1:8000/api/recipes/'),
        ]);
        setAllCategories(categoryResponse.data);
        setAllRecipes(recipeResponse.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load categories and recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return { categories: [], recipes: [] };
    }

    const filteredCategories = allCategories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredRecipes = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    return { categories: filteredCategories, recipes: filteredRecipes };
  }, [query, allCategories, allRecipes]);

  useEffect(() => {
    if (query.trim().length === 0) {
      onSearchResults({ categories: [], recipes: [] }, false, false);
      setSearchInitiated(false);
      return;
    }

    setSearchInitiated(true);

    if (filteredResults.categories.length > 0 || filteredResults.recipes.length > 0) {
      onSearchResults(filteredResults, false, true);
    } else {
      onSearchResults(filteredResults, true, true);
    }
  }, [query, filteredResults, onSearchResults]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for categories or recipes"
      />
      {loading ? <ClipLoader color="#000" size={35} /> : null}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Searchbar;