import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const MainLayout = () => {
  const location = useLocation();

  // List routes where Navbar/Footer should be hidden
  const hideLayoutRoutes = ['/hidden'];  
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {/* Navbar and Footer hidden only on specific routes */}
      {!shouldHideLayout && <Navbar />}
      <Outlet />
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default MainLayout;
