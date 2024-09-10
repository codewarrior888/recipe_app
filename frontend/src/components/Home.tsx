import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';

import '../styles/Home.scss';

const Home = () => {
  const [searchResults, setSearchResults] = useState<{
    categories: any[];
    recipes: any[];
  }>({ categories: [], recipes: [] });
  const [noResults, setNoResults] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const navigate = useNavigate();

  const handleSearchResults = useCallback(
    (results: { categories: any[]; recipes: any[] }, noResults: boolean, searchInitiated: boolean) => {
      setSearchResults(results);
      setNoResults(noResults);
      setSearchInitiated(searchInitiated);
    },
    []
  );

  const handleSelectCategory = useCallback(
    (categorySlug: string) => navigate(`/categories/${categorySlug}`),
    [navigate]
  );

  const handleSelectRecipe = useCallback(
    (recipeSlug: string) => navigate(`/recipes/${recipeSlug}`),
    [navigate]
  );

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>
          Welcome to<br></br>Recipe App
        </h1>
        <p>~ Your almanac for delicious recipes ~</p>
      </div>

      <div className="searchbar-container">
        <Searchbar onSearchResults={handleSearchResults} />

        {!noResults && searchResults.categories.length > 0 && (
          <ul>
            {searchResults.categories.map((category) => (
              <li
                key={category.slug}
                onClick={() => handleSelectCategory(category.slug)}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#8caaed')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'gray')}
              >
                Category: {category.name}
              </li>
            ))}
          </ul>
        )}

        {!noResults && searchResults.recipes.length > 0 && (
          <ul>
            {searchResults.recipes.map((recipe) => (
              <li
                key={recipe.id}
                onClick={() => handleSelectRecipe(recipe.id)}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#8caaed')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'gray')}
              >
                Recipe: {recipe.title}
              </li>
            ))}
          </ul>
        )}

        {searchInitiated && noResults && <p>No such category or recipe</p>}
      </div>
    </div>
  );
};

export default Home;