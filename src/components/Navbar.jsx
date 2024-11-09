import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const [role, setRole] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getRole()
    }, []);

    function getRole() {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        if (user) {
            setRole(user.role);
        }
        else{
            setRole(null)
        }
    }

    const handleLogout = () => {
        logout();
        getRole();
        navigate("/login");
        window.location.reload(true);
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    {role === 'usuario' && role !== null ? 'Panel de Usuario' : role === "admin" ? 'Panel de Admin': <></>}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {role === 'admin' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">Usuarios</Link>
                                </li>
                            </>
                        )}
                    {role ===  null ?  <></>:
                        <li className="nav-item">
                                    <Link className="nav-link" to="/equipos">Equipos</Link>
                        </li>}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Registrarse</Link>
                        </li>
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
