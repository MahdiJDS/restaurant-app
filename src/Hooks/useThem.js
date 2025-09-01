import { useContext } from 'react'
import { ThemContext } from '../Context/ThemContext'

export const useThem = ()=>{
    const context = useContext(ThemContext)

    if(context === undefined){
        throw new Error("usethem undifind")
    }

    return context
}