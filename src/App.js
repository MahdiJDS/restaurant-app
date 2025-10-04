import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useThem } from './Hooks/useThem';
import { CartProvider } from './Context/CartContext';
import { lazy, Suspense } from 'react';

const Navbar = lazy(() => import('./Components/Navbar'));
const ThemSelector = lazy(() => import('./Components/ThemSelector'));
const Home = lazy(() => import('./Page/Home'));
const Search = lazy(() => import('./Page/Search'));
const Create = lazy(() => import('./Page/Create'));
const Recipe = lazy(() => import('./Page/Recipe'));
const Cart = lazy(() => import('./Page/Cart'));
const NotFound = lazy(() => import('./Page/NotFound'));

function App() {
  const { mode } = useThem();

  return (
    <Suspense fallback={
      <div className={`h-screen flex items-center justify-center App ${mode}`}>
        <div className="loader"></div>
      </div>
    }>
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
    </Suspense>
  );
}

export default App;
