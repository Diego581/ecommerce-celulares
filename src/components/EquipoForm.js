// src/components/EquipoForm.js
import React, { useState, useEffect } from 'react';

const EquipoForm = ({ token, fetchEquipos, selectedEquipo, setSelectedEquipo }) => {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (selectedEquipo) {
            setNombre(selectedEquipo.nombre);
        } else {
            setNombre('');
        }
    }, [selectedEquipo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = selectedEquipo ? 'PUT' : 'POST';
        const url = selectedEquipo
            ? `http://localhost:5000/api/equipos/${selectedEquipo.id}`
            : 'http://localhost:5000/api/equipos';

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nombre }),
        });
        setNombre('');
        setSelectedEquipo(null);
        fetchEquipos();
    };

    return (
        <div>
            <h2>{selectedEquipo ? 'Editar Equipo' : 'Agregar Equipo'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del equipo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <button type="submit">{selectedEquipo ? 'Actualizar' : 'Agregar'}</button>
                {selectedEquipo && (
                    <button type="button" onClick={() => setSelectedEquipo(null)}>
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    );
};

export default EquipoForm;
