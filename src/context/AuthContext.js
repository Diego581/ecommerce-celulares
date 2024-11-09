import React, { createContext, useState, useEffect } from 'react';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);
    const [role, setRole] = useState('usuario');

    useEffect(() => {
        if (token) {
            localStorage.setItem("authToken", token);
        } else {
            localStorage.removeItem("authToken");
        }
    }, [token]);

    const logout = () => {
        setToken(null);
        setRole('usuario');
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
       
    };

    const handleAuthError = (error) => {
        if (error.message === "Token inválido o expirado") {
            alert("La sesión ha expirado. Por favor, inicia sesión nuevamente.");
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout, handleAuthError, role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};
