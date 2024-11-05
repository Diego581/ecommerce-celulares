import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="text-red-500 p-4 text-center">
    {message || 'Ocurrió un error'}
  </div>
);

export default ErrorMessage;