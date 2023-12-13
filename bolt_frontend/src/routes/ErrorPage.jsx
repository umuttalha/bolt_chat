import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-2 mx-auto text-red-500">
          <FaExclamationTriangle size={48} />
        </div>
        <h1 className="text-4xl font-bold mb-4">Oops! Page not found.</h1>
        <p className="text-gray-600">The page you are looking for might be in another castle.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 block">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
