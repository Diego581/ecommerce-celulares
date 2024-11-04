
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Llama a la función logout del contexto
        navigate('/login'); // Redirige a la página de login
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Admin Panel</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Usuarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/equipos">Equipos</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {token ? (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Cerrar Sesión</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
