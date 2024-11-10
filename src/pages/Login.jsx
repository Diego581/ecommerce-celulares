import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import userService from '../api/services/userService';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, setRole } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log('Enviando solicitud de inicio de sesión...');  // Verifica si la función se llama
    
        try {
            const response = await userService.loginUser(username, password);
            console.log('Respuesta del login:', response);  // Verifica si recibes la respuesta
            
            const { access_token, rol } = response;
            console.log('Token:', access_token);
            console.log('Role:', rol);
            
            setToken(access_token);
            setRole(rol);

            localStorage.setItem('user', JSON.stringify({
                username,
                rol,
                token: access_token
            }));

            navigate('/');
            // window.location.reload(true);
        } catch (error) {
            console.error("Error al iniciar sesión", error);
        }
    }

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
