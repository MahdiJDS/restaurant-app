import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {

    const [trem , setTrem] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()

        navigate(`/search?q=${trem}`)
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                <input type="text"
                 placeholder='Search Here...' 
                 onChange={e=>setTrem(e.target.value)}
                 value={trem}
                 />
            </label>
        </form>
    </div>
  )
}
