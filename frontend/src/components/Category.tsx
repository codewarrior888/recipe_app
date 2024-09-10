import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryRecipes } from '../api';
import { ClipLoader} from 'react-spinners';

import '../styles/Category.scss';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Category slug is missing');
      setLoading(false);
      return;
    }

    getCategoryRecipes(slug)
      .then((response) => {
        setRecipes(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to fetch recipes for this category');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={35} color="#000" />
        <p>Loading recipes...</p>
      </div>
    );
  }
  if (error) return <p className="error">{error}</p>;
  if (recipes.length === 0) return <p className="no-recipes">No recipes found in this category.</p>;

  return (
    <>
      <div className="category-header">
        <h1>Recipes in {slug}</h1>
      </div>
      <div className="category-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <div className="recipe-title">
              <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {recipe.title ?? 'Untitled Recipe'}
              </Link>
            </div>
            <div className="recipe-content">
              {recipe.image ? (
                <img className="recipe-image" src={recipe.image} alt={recipe.title ?? 'Untitled Recipe'} />
              ) : (
                <p className="no-image">No image available</p>
              )}
              <p className="recipe-preview">
                {recipe.preview ?? 'No preview available for this recipe.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;