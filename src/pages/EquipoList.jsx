// src/components/EquipoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EquipoList = ({ token, setSelectedEquipo }) => {
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/equipos', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEquipos(response.data);
            } catch (error) {
                console.error('Error fetching equipos', error);
            }
        };

        fetchEquipos();
    }, [token]);

    const handleEdit = (equipo) => {
        setSelectedEquipo(equipo);
    };

    const handleDelete = async (equipoId) => {
        try {
            await axios.delete(`http://localhost:5000/api/equipos/${equipoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEquipos(equipos.filter(equipo => equipo.id !== equipoId));
        } catch (error) {
            console.error('Error deleting equipo', error);
        }
    };

    return (
        <div className="mt-4">
            <h2>Lista de Equipos</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map(equipo => (
                        <tr key={equipo.id}>
                            <td>{equipo.id}</td>
                            <td>{equipo.nombre}</td>
                            <td>{equipo.modelo}</td>
                            <td>{equipo.marca}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(equipo)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(equipo.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EquipoList;
