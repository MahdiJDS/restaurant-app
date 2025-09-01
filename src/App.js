import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Page/Home';
import Create from './Page/Create';
import NotFound from './Page/NotFound';
import Navbar from './Components/Navbar';
import Recipe from './Page/Recipe';
import Search from './Page/Search';
import Cart from './Page/Cart';
import ThemSelector from './Components/ThemSelector';
import { useThem } from './Hooks/useThem';
import { CartProvider } from './Context/CartContext';

function App() {
  const { mode } = useThem();

  return (
    <CartProvider>
      <div className={`App ${mode}`}>
        <BrowserRouter>
          <Navbar />
          <ThemSelector />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
