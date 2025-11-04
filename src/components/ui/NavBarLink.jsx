import  { Link } from "react-router-dom";

const NavBarLink = () => {
  return (
     <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
       <li className="nav-item ">
         <a className="nav-link active fw-semibold" href="/">Home</a>
         </li>
         <li className="nav-item">
            <Link to="/profiles" className="nav-link fw-semibold">Profile</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link fw-semibold" href="/about">About</a>
            </li>
            <li className="nav-item">
                <a className="nav-link fw-semibold" href="/contact">Contact</a>
            </li>
     </ul>
  )
}

export default NavBarLink;