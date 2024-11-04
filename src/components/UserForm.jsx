// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ user = {}, onSave, onCancel }) => {
    const [username, setUsername] = useState(user.username || '');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.email || '');
    const [role, setRole] = useState(user.role || 'usuario'); // Rol por defecto

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { username, password, email, role };
        if (user.id) {
            // Actualizar usuario existente
            await axios.put(`http://localhost:5000/api/users/${user.id}`, newUser);
        } else {
            // Crear nuevo usuario
            await axios.post('http://localhost:5000/api/users', newUser);
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
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
