import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearEquipo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    costo: '',
    modelo_id: '',
    caracteristica_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Enviando datos:', formData);

    try {
      const equipoData = {
        ...formData,
        costo: parseFloat(formData.costo),
        modelo_id: parseInt(formData.modelo_id),
        caracteristica_id: formData.caracteristica_id ? parseInt(formData.caracteristica_id) : null
      };
      const response = await axios.post('http://localhost:5000/api/equipos', equipoData);
      
      console.log('Respuesta:', response.data); 

      alert('Equipo creado exitosamente!');
      setTimeout(() => {
        navigate('/equipos');
      }, 500);

    } catch (error) {
      console.error('Error:', error); 
      alert('Error al crear el equipo: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Crear Nuevo Equipo</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Costo:
          </label>
          <input
            type="number"
            name="costo"
            value={formData.costo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Modelo ID:
          </label>
          <input
            type="number"
            name="modelo_id"
            value={formData.modelo_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Característica ID (opcional):
          </label>
          <input
            type="number"
            name="caracteristica_id"
            value={formData.caracteristica_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Equipo
        </button>
      </form>
    </div>
  );
};

export default CrearEquipo;