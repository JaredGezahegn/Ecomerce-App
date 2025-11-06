import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Homepage from './components/Home/Homepage';
import NotFoundPage from './components/ui/NotFoundPage';

function App() {
  return (
     <Router>
       <Routes>
          <Route path="/" element={<MainLayout/>}>
          <Route index element={<Homepage/>}/>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          
       </Routes>
     </Router>
  );
}

export default App;