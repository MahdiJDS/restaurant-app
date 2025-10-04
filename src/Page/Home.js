import React from 'react'
import { useFetch } from '../Hooks/useFetch'
import { lazy, Suspense } from 'react';

const RecipeList = lazy(() => import('../Components/RecipeList'))

export default function Home() {

  const { data, isLoading, error, deleteData } = useFetch('http://localhost:3000/recipes')
  return (
    <Suspense fallback={
      <div className={`h-screen flex items-center justify-center`}>
        <div className="loader"></div>
      </div>
    }>
      <div className='flex justify-center'>
        {error && <p className='error'>{error}</p>}
        {data && <RecipeList recipes={data} deleteData={deleteData} />}

      </div>
    </Suspense>
  )
}
