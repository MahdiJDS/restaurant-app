import { useThem } from '../Hooks/useThem'
import darkIcon from '../assets/brightness_6_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'

const themColors = ['#58249c' , '#249c6b' , '#b70233']

export default function ThemSelector() {

    const {changeColor , changeMode , mode} = useThem()

    const toggleMode = () =>{
        changeMode(mode === 'dark' ? 'light' : 'dark')
        console.log(mode)
    }
  return (
    <div className='flex justify-between items-center px-10 py-10 '>
        <div className='cursor-pointer hover:-translate-y-1 duration-300'>
            <img src={darkIcon}
            onClick={toggleMode}
            className='w-10 h-10 '
            style={{filter : mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}}
             />
        </div>
        <div >
            {themColors.map(color =>( 
                <div
                className='inline-block w-8 h-8 cursor-pointer rounded-full mx-3 hover:-translate-y-1 duration-300'
                key={color}
                onClick={() => changeColor(color)}
                style={{background: color}} 
                />
            ))}

        </div>

    </div>
  )
}
