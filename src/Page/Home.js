import React from 'react'
import { useFetch } from '../Hooks/useFetch'
import Recipe from './Recipe'
import RecipeList from '../Components/RecipeList'

export default function Home() {

    const {data , isLoading ,error , deleteData} = useFetch('http://localhost:3000/recipes')
  return (
    <div className='flex justify-center'>
           {error && <p className='error'>{error}</p>}
           {isLoading && <p className='loading'>Loading...</p>}
           {data && <RecipeList recipes={data} deleteData={deleteData}/>}
        
    </div>
  )
}
