import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeList from '../Components/RecipeList';
import { useFetch } from '../Hooks/useFetch';

const Search = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q'); 



  const {data: recipes,isLoading,error } = useFetch('http://localhost:3000/recipes', 'GET', query);

  const filtered = query? recipes?.filter(r => r.title.toLowerCase().includes(query.toLowerCase())) : recipes;

  


  return (
    <div className='flex flex-col items-center pt-10 gap-5 justify-center'>
      <h2 className='text-3xl font-bold '>Search Results for: "{query}"</h2>
      {error && <p>{error}</p>}
      {isLoading ? <p>Loading...</p> : (
        <div>
          {recipes && recipes.length > 0 ? (
            <RecipeList recipes={filtered}/>
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
