import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api';
import { ClipLoader } from 'react-spinners';

import '../styles/Categories.scss';

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to fetch categories.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={35} color="#000" loading={loading} />
      </div>
    );
  }
  if (error) return <p className="error">{error}</p>;
  if (categories.length === 0) return <p className="no-categories">No categories available.</p>;

  return (
    <>
      <div className="categories-header">
        <h1>Categories</h1>
      </div>
      <div className="categories-container">
        <ul>
          {categories.map((category: any) => (
            <li
              className="category-item"
              key={category.slug}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              {category.image ? (
                <img className="category-image" src={category.image} alt={category.name ?? 'Unnamed category'} />
              ) : (
                <p className="no-image">No image available</p>
              )}
              <Link
                to={`/categories/${category.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}
              >
                {category.name ?? 'Unnamed category'}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;