import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { equipoService } from '../api/services/equipoServices';
import { Link, useNavigate } from 'react-router-dom';

const EquipoList = () => {
  const navigate = useNavigate();
  const { data: equipos, error, loading, execute } = useApi(equipoService.getEquipos);
  const [refresh, setRefresh] = useState(false);

  const handleDelete = async (id) => {
    try {
      await equipoService.deleteEquipo(id);
      alert('Equipo eliminado exitosamente');
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error al eliminar equipo:', error);
      alert('No se pudo eliminar el equipo');
    }
  };
  useEffect(() => {
    execute();
  }, [execute, refresh]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;
  if (!equipos?.length) return <div className="text-center">No hay equipos disponibles</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-black mb-6">Lista de Equipos</h2>
      <button className="bg-white text-black text-gray-800 border border-gray-300 rounded-lg px-4 py-2 shadow hover:bg-gray-200 transition duration-150 ease-in-out">
        <Link className='text-decoration-none text-black' to={`/create_equipo`}>Agregar equipo</Link>
      </button>
      <br />
      <br />
      <div className="bg-white rounded-lg shadow-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-5 text-left text-sm font-medium text-gray-800">ID</th>
              <th className="py-3 px-5 text-left text-sm font-medium text-gray-800">Nombre</th>
              <th className="py-3 px-5 text-left text-sm font-medium text-gray-800">Costo</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {equipos.map((equipo) => (
              <tr key={equipo.id}>
                <td className="py-4 px-5 text-sm text-gray-700">{equipo.id}</td>
                <td className="py-4 px-5 text-sm text-gray-700">{equipo.nombre}</td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  {equipo.costo?.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </td>
                <td className="py-4 px-5 text-sm text-gray-700">
                  <button
                    onClick={() => navigate(`/equipos/${equipo.id}`)}
                    className="bg-white text-black text-gray-800 border border-gray-300 rounded-lg px-4 py-2 shadow hover:bg-gray-200 transition duration-150 ease-in-out"
                  >
                    Editar
                  </button>
                  </td>
                  <td>
                  <button
                    onClick={() => handleDelete(equipo.id)}
                    className="bg-black text-white rounded-lg px-4 py-2 shadow hover:bg-gray-800 transition duration-150 ease-in-out"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipoList;
