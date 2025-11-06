import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>

        </>
    );
}   
export default MainLayout;