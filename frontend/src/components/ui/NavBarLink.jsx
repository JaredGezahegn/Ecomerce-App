import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext";

const NavBarLink = () => {
  const { t } = useLang();
  
  return (
     <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
       <li className="nav-item">
         <Link to="/" className="nav-link active fw-semibold">{t('nav.home')}</Link>
         </li>
         <li className="nav-item">
            <Link to="/profiles" className="nav-link fw-semibold">{t('nav.products')}</Link>
            </li>
            <li className="nav-item">
                <Link to="/about" className="nav-link fw-semibold">{t('nav.about')}</Link>
            </li>
            <li className="nav-item">
                <Link to="/contact" className="nav-link fw-semibold">{t('nav.contact')}</Link>
            </li>
     </ul>
  )
}

export default NavBarLink;