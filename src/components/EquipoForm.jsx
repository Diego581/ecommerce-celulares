import React, { useState, useEffect } from 'react';

const EquipoForm = ({ token, fetchEquipos, selectedEquipo, setSelectedEquipo }) => {
    const [nombre, setNombre] = useState('');
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');

    useEffect(() => {
        if (selectedEquipo) {
            setNombre(selectedEquipo.nombre);
            setModelo(selectedEquipo.modelo);
            setMarca(selectedEquipo.marca);
        } else {
            setNombre('');
            setModelo('');
            setMarca('');
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
            body: JSON.stringify({ nombre, modelo, marca }),
        });
        
        // Reset form after submission
        setNombre('');
        setModelo('');
        setMarca('');
        setSelectedEquipo(null);
        fetchEquipos();
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre del equipo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">Por favor, ingresa el nombre del equipo.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="modelo" className="form-label">Modelo del equipo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="modelo"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">Por favor, ingresa el modelo del equipo.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca del equipo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="marca"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">Por favor, ingresa la marca del equipo.</div>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                        {selectedEquipo ? 'Actualizar' : 'Agregar'}
                    </button>
                    {selectedEquipo && (
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => setSelectedEquipo(null)}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>

    );
};

export default EquipoForm;
