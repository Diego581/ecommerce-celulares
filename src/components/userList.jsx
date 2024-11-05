import React, { useEffect, useCallback } from 'react';
import userService from '../api/services/userService';
import { useApi } from '../hooks/useApi';
import { Loading } from './common/Loading';
import ErrorMessage from './common/ErrorMessage';

const UserList = () => {
  const { data: users, error, loading, execute: loadUsers } = useApi(userService.getUsers);

  const fetchUsers = useCallback(() => {
    loadUsers().catch(err => console.error('Error al cargar usuarios:', err));
  }, [loadUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <Loading />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!users) {
    return <div>No hay usuarios disponibles.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-black mb-8">Lista de Usuarios</h2>
      <div className="bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-5 text-left text-sm font-medium text-gray-800">ID</th>
              <th className="py-3 px-5 text-left text-sm font-medium text-gray-800">Username</th>
              <th className="py-3 px-5 text-left text-sm font-medium text-gray-800">email</th>
              <th className="py-3 px-5 text-left text-sm font-medium text-gray-800">Rol</th>
              <th className="py-3 px-5 text-left text-sm font-medium text-gray-800">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-4 px-5 text-sm text-gray-700">{user.id}</td>
                <td className="py-4 px-5 text-sm text-gray-700">{user.username}</td>
                <td className="py-4 px-5 text-sm text-gray-700">{user.email}</td>
                <td className="py-4 px-5 text-sm text-gray-700">{user.rol}</td>
                <td className="py-4 px-5 flex space-x-2">
                  <button className="bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 shadow hover:bg-gray-200 transition duration-150 ease-in-out">
                    <link to="/edit" />Editar <link/>
                  </button>
                  <button className="bg-black text-white rounded-lg px-4 py-2 shadow hover:bg-gray-800 transition duration-150 ease-in-out">
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

export default UserList;
