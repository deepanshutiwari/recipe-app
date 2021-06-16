import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const API_ID = '5666fa7e';
  const API_KEY = 'da35236d3a71bbad6871788a5de67a50';

  const [recipes, setRecipe] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('paneer');

  useEffect(() => {
    getRecipe();
  }, [query])

  const getRecipe = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setRecipe(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }

  return (
    <div className='App'>
      <form className='search-form' onSubmit={getSearch}>
        <input className='search-bar' type='text' value={search} onChange={updateSearch} />
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (<Recipe key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />))}
      </div>
    </div>
  );
}

export default App;
