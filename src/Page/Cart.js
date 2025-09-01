import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export default function Cart() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    const totalPrice = (price, quantity) => {
        return price * quantity
    }

    const totalAmount = cart.reduce((acc, item) => {
        return acc + totalPrice(item.price, item.quantity);
    }, 0);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            {cart.length === 0 ? (
                <div className='flex flex-col '>
                    <p className="text-lg text-gray-500 mb-4">Your cart is empty.</p>
                    <Link to='/' className='bg-blue-500 text-center text-white px-4 py-2 rounded-md hover:bg-blue-600'>
                        Back Home
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-5 w-[500px] border border-gray-200 rounded-lg shadow-md">
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="text-gray-600">Price: ${totalPrice(item.price, item.quantity)}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center p-5 w-full max-w-[500px] border border-gray-200 rounded-lg shadow-md mt-4">
                        <h3 className="text-xl font-semibold">Total Price</h3>
                        <p className="text-gray-600">${totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-center">
                        <Link to="/checkout" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
                            checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
