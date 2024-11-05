import { useApi } from '../hooks/useApi';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ user = {}, onSave, onCancel }) => {
    const [username, setUsername] = useState(user.username || '');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(user.role || 'usuario'); // Rol por defecto

    // Definir funciones API para creación y actualización
    const createUserApi = async () => {
        const newUser = { username, password, email, role };
        return await axios.post('http://localhost:5000/api/users', newUser);
    };

    const updateUserApi = async () => {
        const updatedUser = { username, password, email, role };
        return await axios.put(`http://localhost:5000/api/users/${user.id}`, updatedUser);
    };

    // Hook personalizado useApi
    const { execute: createUser, loading: creatingUser, error: createError } = useApi(createUserApi);
    const { execute: updateUser, loading: updatingUser, error: updateError } = useApi(updateUserApi);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.id) {
            await updateUser(); // Actualizar usuario existente
        } else {
            await createUser(); // Crear nuevo usuario
        }
        onSave(); // Llamar función para refrescar la lista de usuarios
    };

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
                    required={!user.id} // Solo requerido si es nuevo usuario
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
