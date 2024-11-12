import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
const Dashboard = () => {
const navigate = useNavigate();

    return (
        <div>
            <div className="mt-5">
                <h2>Bienvenido al Panel de Administración</h2>
                <p>Utiliza el menú de navegación para acceder a las diferentes secciones de la aplicación.</p>
            </div>
            <br />
            <div className=' mt-2'>
            <h1> <button className='bg-black text-white rounded-lg px-4 py-2 shadow hover:bg-gray-800 transition duration-150 ease-in-out'><Link className="nav-link" to="/equipos">Equipos</Link> </button></h1>
            <h1> <button className='bg-white text-black text-gray-800 border border-gray-300 rounded-lg px-4 py-2 shadow hover:bg-gray-200 transition duration-150 ease-in-out'><Link className="nav-link" to="/users">Usuarios</Link> </button></h1>
            </div>
        </div>
    );
};

export default Dashboard;
