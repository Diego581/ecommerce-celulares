// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, setRole } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulación de autenticación
        if (username === 'admin' && password === 'admin') {
            const adminToken = 'token-de-admin'; // Cambia esto por un token real
            setToken(adminToken);
            setRole('admin'); // Establece el rol a admin
            navigate('/');
        } else {
            // Asigna rol de usuario por defecto para otros usuarios
            const userToken = 'token-de-usuario'; // Cambia esto por un token real
            setToken(userToken);
            setRole('usuario'); // Establece el rol a usuario
            navigate('/');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario</label>
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
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
