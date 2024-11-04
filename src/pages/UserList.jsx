import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from '../components/UserForm';
import { ErrorModal } from '../components/utils/ErrorModal';



const UserList = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleApiError = (error, customMessage) => {
        const message = error.response?.data?.message || 
                       error.message || 
                       customMessage || 
                       'Ha ocurrido un error inesperado';
        
        setErrorMessage(message);
        setIsErrorModalOpen(true);
        console.error('Error detallado:', error);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data.users);
            } catch (error) {
                handleApiError(error, 'Error al cargar la lista de usuarios');
            }
        };
        fetchUsers();
    }, [token]);

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                handleApiError(error, 'Error al eliminar el usuario');
            }
        }
    };

    const handleSave = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
            setSelectedUser(null); // Cerrar el formulario después de guardar
        } catch (error) {
            handleApiError(error, 'Error al actualizar la lista de usuarios');
        }
    };

    return (
        <div className="mt-4">
            <h2>Lista de Usuarios</h2>
            <button 
                className="btn btn-success mb-3" 
                onClick={() => setSelectedUser({})}
            >
                Crear Usuario
            </button>

            {selectedUser && (
                <UserForm 
                    user={selectedUser} 
                    onSave={handleSave} 
                    onCancel={() => setSelectedUser(null)} 
                />
            )}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button 
                                    className="btn btn-warning btn-sm me-2" 
                                    onClick={() => handleEdit(user)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ErrorModal
                open={isErrorModalOpen}
                message={errorMessage}
                onClose={() => setIsErrorModalOpen(false)}
            />
        </div>
    );
};

export default UserList;