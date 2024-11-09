import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';  // Usa Navigate para redirigir
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, requiredRole }) => {
    const { isAuthenticated, role } = useContext(AuthContext);
    console.log('isAuthenticated:', isAuthenticated());

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />; 
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" replace />; 
    }

    return Component;
};

export default ProtectedRoute;
