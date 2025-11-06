import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <header
      className="d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #0d1b2a, #1b263b, #415a77)',
        minHeight: '100vh', // full viewport height
        width: '100%',
        color: 'white',
      }}
    >
      <div
        className="text-center p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '10px',
          maxWidth: '600px',
          margin: '0 1rem',
        }}
      >
        <h1 className="display-4 fw-bolder">404 - Page Not Found</h1>
        <p className="lead fw-normal mb-4">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-light btn-lg rounded-pill px-4 py-2">
          Go to Homepage
        </Link>
      </div>
    </header>
  );
};

export default NotFoundPage;
