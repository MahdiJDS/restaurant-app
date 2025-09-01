import React, { useState } from 'react';
import { useFetch } from '../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useThem } from '../Hooks/useThem';

export default function Create() {
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [ingredientsNew, setIngredientsNew] = useState('');
    const [price , setPrice] = useState('')
    const [ingredients, setIngredients] = useState([]);
    const [post, setPost] = useState(false);
    const [image, setImage] = useState(null);

    const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            title,
            ingredients,
            method,
            price,
            cookingTime: cookingTime + ' minutes',
            image: image ? URL.createObjectURL(image) : '' 
        };

        postData(formData);

        setTitle('');
        setMethod('');
        setCookingTime('');
        setIngredientsNew('');
        setIngredients([]);
        setPost(true);
        setImage(null);
        setPrice('')

        setTimeout(() => {
            setPost(false);
            navigate('/');
        }, 2000);
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (ingredientsNew && !ingredients.includes(ingredientsNew)) {
            setIngredients((prev) => [...prev, ingredientsNew]);
        }
        setIngredientsNew('');
    };

    // const handleImageChange = (e) => {
    //     setImage(e.target.files[0]); 
    // };

    const { mode } = useThem();

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] bg-[#ccc]" style={{ background: mode === 'dark' ? '#333' : '#ccc', color:mode === 'dark' ? '#fff' : '#333'}}>
            {!post && <h2 className="text-xl font-bold mt-10">Add a New Recipe</h2>}

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10 p-20 text-center justify-center">
                <label>
                    <span>Recipe Title: </span>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Recipe Ingredients: </span>
                    <div className="flex flex-row gap-3">
                        <input
                            type="text"
                            className="w-full"
                            onChange={(e) => setIngredientsNew(e.target.value)}
                            value={ingredientsNew}
                        />
                        <button type="button" className="btn p-2" onClick={handleClick}>
                            Add
                        </button>
                    </div>

                    <p>Current ingredients: {ingredients.map((i) => <em key={i}>{i},</em>)}</p>
                </label>

                <label>
                    <span>Recipe Method: </span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking Time (m): </span>
                    <input
                        type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>

                <label>
                    <span>Ptice $: </span>
                    <input
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                    />
                </label>

                <label>
                    <span>Upload Image: </span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {setImage(e.target.files[0]); }}
                    />
                </label>

                <div>
                    <button className="btn">Submit</button>
                    {post && <h2 className="text-lg font-bold">Backing Home...</h2>}
                </div>
            </form>
        </div>
    );
}
