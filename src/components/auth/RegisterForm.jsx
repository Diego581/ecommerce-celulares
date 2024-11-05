import React, { useState } from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://your-flask-api-url.railway.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        // Limpiar los campos del formulario después del registro exitoso
        setName('');
        setEmail('');
        setPassword('');
        
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      } else {
        const error = await response.json();
        console.error('Error al registrar usuario:', error);
        alert('Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;