import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetails } from '../api';
import { ClipLoader} from 'react-spinners';

import '../styles/Recipe.scss';

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Recipe ID is missing');
      setLoading(false);
      return;
    }

    getRecipeDetails(parseInt(id))
      .then((response) => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch recipe details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={35} color="#000" />
        <p>Loading recipes...</p>
      </div>
    );
  }
  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p className="no-recipe">No recipe found.</p>;

  const createdAt = new Date(recipe?.created_at);
  const formattedDate = createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="recipe-container">
      <div className="recipe-header">
        <p>{recipe.category ?? 'Unknown Category'}</p>
        <h1>{recipe.title ?? 'Untitled Recipe'}</h1>
        <p className="recipe-date">( Posted on: {formattedDate} )</p>
      </div>

      <div className="recipe-image-container">
        {recipe.image ? (
          <img className="recipe-image" src={recipe.image} alt={recipe.title} />
        ) : (
          <p className="no-image">No image available</p>
        )}
      </div>

      <div className="recipe-description">
        <h2>Description</h2>
        <p>{recipe.description ?? 'No description provided'}</p>
      </div>

      <div className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients
            ? recipe.ingredients.split('<br>').map((ingredient: string, index: number) => (
                <li key={index}>{ingredient.trim()}</li>
              ))
            : <li>No ingredients listed</li>}
        </ul>
      </div>

      <div className="recipe-instructions">
        <h2>Instructions</h2>
        <ul>
          {recipe.instructions
            ? recipe.instructions.split('<br>').map((instruction: string, index: number) => (
                <li key={index}>{instruction.trim()}</li>
              ))
            : <li>No instructions provided</li>}
        </ul>
      </div>
    </div>
  );
};

export default Recipe;