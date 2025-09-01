import React from 'react'
import { Link } from 'react-router-dom'
import { useThem } from '../Hooks/useThem';


export default function RecipeList({ recipes, deleteData }) {

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            deleteData(id);
        }
    };

    const {mode} = useThem()
    return (
        <div className='grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5 p-5'>
            {recipes.map(recipe => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <h1 className='text-2xl font-bold'>{recipe.title}</h1>
                    <img src={recipe.image} />
                    <p>{recipe.cookingTime} to make</p>

                    <div className='flex flex-col w-full gap-5'>
                        {recipe.method ? recipe.method.substring(0, 100) : 'No method available...'}...
                        <Link to={`/recipe/${recipe.id}`} className='btn'>Cook This</Link>
                        <button onClick={() => handleDelete(recipe.id)} className='btn'>Delete Recipe</button>
                    </div>
                    

                </div>
            ))
            }
        </div >
    )
}
