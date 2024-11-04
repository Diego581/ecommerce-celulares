// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100"> {/* Asegúrate de que el navbar ocupe el 100% del ancho */}
            <div className="container">
                <Link className="navbar-brand" to="/">Admin Panel</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto"> {/* Elementos alineados a la izquierda */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Usuarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/equipos">Equipos</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav"> {/* Elementos alineados a la derecha */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
