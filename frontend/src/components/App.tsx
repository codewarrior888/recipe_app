import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import Categories from './Categories';
import Recipe from './Recipe';
import OpenAPI from './OpenAPI';

import '../styles/App.scss';

const getNavLinkStyles = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: 'none',
  borderBottom: isActive ? '5px solid #ffa70f' : 'none',
  fontWeight: isActive ? 'bold' : 'normal',
  color: 'inherit',
});

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to="/" style={getNavLinkStyles}>
          Home
        </NavLink>

        <NavLink to="/categories" style={getNavLinkStyles}>
          Categories
        </NavLink>

        <NavLink to="/api-docs" style={getNavLinkStyles}>
          API Docs
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<Category />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/api-docs" element={<OpenAPI />} />
        
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;