
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EquipoForm from '../components/EquipoForm';
import { ErrorModal } from '../components/utils/ErrorModal';


const EquipoList = ({ token }) => {
    const [equipos, setEquipos] = useState([]);
    const [selectedEquipo, setSelectedEquipo] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleApiError = (error, customMessage) => {
        const message = error.response?.data?.message || 
                       error.message || 
                       customMessage || 
                       'Ha ocurrido un error inesperado';
        setErrorMessage(message);
        setIsErrorModalOpen(true);
        console.error('Error detallado:', error);
    };

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEquipos(response.data.products);
            } catch (error) {
                handleApiError(error, 'Error al cargar la lista de equipos');
            }
        };
        fetchEquipos();
    }, [token]);

    const handleEdit = (equipo) => {
        setSelectedEquipo(equipo);
    };

    const handleDelete = async (equipoId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
            try {
                await axios.delete(`http://localhost:5000/api/equipos/${equipoId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEquipos(equipos.filter(equipo => equipo.id !== equipoId));
            } catch (error) {
                handleApiError(error, 'Error al eliminar el equipo');
            }
        }
    };

    const handleSave = async (equipoData) => {
        try {
            if (selectedEquipo?.id) {
                await axios.put(`http://localhost:5000/api/equipos/${selectedEquipo.id}`, equipoData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                const response = await axios.post('http://localhost:5000/api/equipos', equipoData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEquipos([...equipos, response.data]);
            }
            setSelectedEquipo(null);
        } catch (error) {
            handleApiError(error, 'Error al guardar el equipo');
        }
    };

    return (
        <div className="mt-4">
            <h2>Lista de Equipos</h2>
            <button 
                className="btn btn-success mb-3" 
                onClick={() => setSelectedEquipo({})}
            >
                Crear Equipo
            </button>

            {selectedEquipo && (
                <EquipoForm 
                    equipo={selectedEquipo} 
                    onSave={handleSave} 
                    onCancel={() => setSelectedEquipo(null)} 
                />
            )}

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
                                <button 
                                    className="btn btn-warning btn-sm me-2" 
                                    onClick={() => handleEdit(equipo)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDelete(equipo.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ErrorModal
                open={isErrorModalOpen}
                message={errorMessage}
                onClose={() => setIsErrorModalOpen(false)}
            />
        </div>
    );
};

export default EquipoList;
