import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Homepage from './components/Home/Homepage';
import NotFoundPage from './components/ui/NotFoundPage';
import ProductPage from './components/product/ProductPage';
import { useState, useEffect } from "react"
import CartPage from './components/cart/CartPage';

function App() {

  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code")

  useEffect(function () {
    if (cart_code) {
      api.get(`get_cart_stat?cart_code=${cart_code}`)
        .then(res => {
          console.log(res.data)
          setNumberCartItems(res.data.num_of_items)
        })

        .catch(err => {
          console.log(err.message)

        })
    }

  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
          <Route index element={<Homepage />} />
          <Route path="/products/:slug" element={<ProductPage setNumberCartItems={setNumberCartItems} />} />
          <Route path="cart" element={<CartPage/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App;