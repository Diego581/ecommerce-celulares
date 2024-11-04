import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm({ token, fetchUsers, selectedUser, setSelectedUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (selectedUser) {
            setUsername(selectedUser.username);
            setPassword('');
            setRole(selectedUser.role);
        }
    }, [selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const data = { username, password, role };

            if (selectedUser) {
                await axios.put(`http://localhost:5000/users/${selectedUser.id}`, data, config);
            } else {
                await axios.post('http://localhost:5000/users', data, config);
            }

            fetchUsers();
            setSelectedUser(null);
            setUsername('');
            setPassword('');
            setRole('');
        } catch (error) {
            console.error('Error en la creación/actualización del usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{selectedUser ? 'Editar Usuario' : 'Crear Usuario'}</h3>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!selectedUser}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Seleccione un rol</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
            <button type="submit">{selectedUser ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
}

export default UserForm;