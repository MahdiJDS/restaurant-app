import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../Hooks/useFetch';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import shop from '../assets/shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';

export default function Recipe() {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`;
  console.log("Fetching data from:", url);
  const { data: recipe, isLoading, error } = useFetch(url);

  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const existingItem = cart.find(item => item.id === recipe?.id);
  const quantity = existingItem ? existingItem.quantity : 0;

  const handleAddToCart = () => {
    if (recipe) {
      addToCart(recipe);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 min-h-screen text-center relative">
      <img
        src="/img/—Pngtree—watercolor sakura frame background with_3670950.png"
        className="absolute -top-5 -left-10 opacity-100 w-96 h-96"
        alt="Background"
      />
      <div className="card w-[800px]">
        {error && <p>{error}</p>}
        {/* {isLoading && <p>Loading...</p>} */}
        {isLoading && <div className={`h-screen flex items-center justify-center`}>
          <div className="loader"></div>
        </div>}
        {recipe && (
          <>
            <h2 className="text-2xl font-bold">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className="my-4" loading='lazy' />
            <p>Takes {recipe.cookingTime} to Cook.</p>
            <ul>
              {recipe.ingredients.map(ing => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
            <p>{recipe.method}</p>
            <div className="mb-4">
              {quantity > 0 && (
                <p className="flex flex-row items-center p-3">
                  <div className='flex flex-row gap-1 items-center'>
                    <button
                      onClick={() => increaseQuantity(recipe.id)}
                      className=" text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      +
                    </button>
                    <img src={shop} className="w-10 h-10 ml-2" alt="Shopping Cart" />
                    {quantity}
                    <button
                      onClick={() => decreaseQuantity(recipe.id)}
                      className=" text-white px-4 py-2 rounded-md hover:bg-yellow-600 ml-2"
                    >
                      -
                    </button>
                  </div>
                </p>
              )}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Buy this
                </button>
              </div>
            </div>
            <div>
              <Link to="/" className="btn bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                Back Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
