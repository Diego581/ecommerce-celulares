import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../api/services/userService';

const UserForm = ({ onCancel }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    
    // Estado local para el formulario
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('usuario');

    useEffect(() => {
        fetchUser();
    }, [id]);
    const fetchUser = async () => {
        if (id) {
            try {
                setUser(await userService.getUser(id));
            } catch (err) {
                console.error('Error al cargar el usuario:', err);
            }
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userPayload = { id, username, password, rol };
        console.log("esto es el user ",user)
        try {
            if (user.id !== null && user.id !== undefined) {
                await userService.updateUser(user.id, userPayload);
            } else {
                await userService.createUser(userPayload);
            }
        } catch (err) {
            console.error('Error al guardar el usuario:', err);
        }
        console.log("esto es userPayload ",userPayload)
        navigate('/users'); 
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
                    required={!user?.id}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="rol" className="form-label">Rol</label>
                <select
                    className="form-select"
                    id="rol"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
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
