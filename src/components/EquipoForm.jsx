import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EquipoForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    costo: '',
    modelo_id: 1,
    caracteristica_id: 1
  });

  
  useEffect(() => {
    if (id) {

      const fetchEquipo = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/equipos/${id}`);
          setFormData({
            nombre: response.data.nombre,
            costo: response.data.costo,
            modelo_id: response.data.modelo_id,
            caracteristica_id: response.data.caracteristica_id || ''
          });
        } catch (error) {
          console.error('Error al cargar el equipo:', error);
        }
      };
      fetchEquipo();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const equipoData = {
        ...formData,
        costo: parseFloat(formData.costo),
        modelo_id: parseInt(formData.modelo_id),
        caracteristica_id: formData.caracteristica_id ? parseInt(formData.caracteristica_id) : null
      };

      if (id) {
        await axios.put(`http://localhost:5000/api/equipos/${id}`, equipoData);
        alert('Equipo actualizado exitosamente!');
      } else {
        await axios.post('http://localhost:5000/api/equipos', equipoData);
        alert('Equipo creado exitosamente!');
      }
      
      navigate('/equipos');
    } catch (error) {
      console.error('Error al guardar el equipo:', error);
      alert('Error al guardar el equipo: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Editar Equipo' : 'Crear Nuevo Equipo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Costo:</label>
          <input
            type="number"
            name="costo"
            value={formData.costo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        >
          {id ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
};

export default EquipoForm;
