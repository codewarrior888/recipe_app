import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const getCategories = () => api.get('categories/');
export const getCategoryRecipes = (slug: string) => api.get(`categories/${slug}/recipes/`);
export const getRecipeDetails = (id: number) => api.get(`recipes/${id}/`);
