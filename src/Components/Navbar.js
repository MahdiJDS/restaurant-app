import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useThem } from '../Hooks/useThem'
import { useCart } from '../Context/CartContext'


export default function Navbar() {

  const { color, changColor } = useThem()
  const { cart } = useCart()
  console.log(cart)

  return (
    <div className='bg-gray-900 p-6 px-10 w-screen' style={{ background: color }}>
      <nav className='flex flex-row justify-between items-center'>
        <NavLink to="/" className='text-white'>
          <h1 className='font-mono text-2xl'>FoodCode</h1>
        </NavLink>
        <div className=''>
          <SearchBar />
        </div>
        <div className='flex gap-1'>
          <NavLink to="/create" className='text-white'>
            <h3 className='btn'>Create</h3>
          </NavLink>
          <NavLink to="/cart" className='text-white'>
            {cart.length > 0 ?
              <div className='relative'>
                <h3 className='btn'>Cart</h3>
                <span className='absolute -top-1 -right-2 bg-red-700 w-4 h-4 flex items-center justify-center rounded-full'></span>
              </div>
              :
              <h3 className='btn bg-green-600'>Cart</h3>
            }
          </NavLink>
        </div>


      </nav>
    </div>
  )
}
