import { useApi } from '../hooks/useApi';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../api/services/userService';
import { Loading } from './common/Loading';
import ErrorMessage from './common/ErrorMessage';

const UserForm = ({ onCancel }) => {
    const { id } = useParams();
    const navigate = useNavigate(); // Para redireccionar
    const { data: user, error, loading, execute: getUser } = useApi(() => id ? userService.getUser(id) : Promise.resolve(null)); // Evita ejecutar si no hay ID

    
    // Estado local para el formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('usuario');

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const userData = await userService.getUser(id);
                    setUsername(userData.username || '');
                    setRole(userData.role || 'usuario');
                } catch (err) {
                    console.error('Error al cargar el usuario:', err);
                }
            }
        };
    
        fetchUser();
    }, [id]);
    if (loading) {
        return <Loading />;
      }
      
      if (error) {
        return <ErrorMessage message={error} />;
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userPayload = { username, password, role };
        console.log(user)
        // try {
        //     if (user?.id) {
        //         await userService.updateUser(user.id, userPayload);
        //     } else {
        //         await userService.createUser(userPayload);
        //     }
        //     navigate('/users'); // Redirigir a la lista de usuarios
        // } catch (err) {
        //     console.error('Error al guardar el usuario:', err);
        // }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!user?.id}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Rol</label>
                <select
                    className="form-select"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

export default UserForm;
