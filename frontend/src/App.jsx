import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Homepage from './components/Home/Homepage';
import NotFoundPage from './components/ui/NotFoundPage';
import ProductPage from './components/product/ProductPage';

function App() {
  return (
     <Router>
       <Routes>
          <Route path="/" element={<MainLayout/>}>
          <Route index element={<Homepage/>}/>
          <Route path="/products/:slug" element={<ProductPage/>}/>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          
       </Routes>
     </Router>
  );
}

export default App;