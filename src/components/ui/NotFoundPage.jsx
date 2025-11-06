import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <header
      className="py-3 my-5"
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbjRYbs7yZ5qmUwMakYWsaRzbhssYHN9JhSw&s')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        color: 'white',
      }}
    >
      <div className="container px-4 px-lg-5 my-5">
        <div
          className="text-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '2rem', borderRadius: '10px' }}
        >
          <h1 className="display-4 fw-bolder">404 - Page Not Found</h1>
          <p className="lead fw-normal mb-4">The page you are looking for does not exist.</p>
          <Link to="/" className="btn btn-light btn-lg rounded-pill px-4 py-2">
            Go to Homepage
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NotFoundPage;
