import React, { createContext, useState, useEffect } from 'react';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);
    const [role, setRole] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user).rol : 'usuario';
    });

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
    const isAuthenticated = () => {
        return token !== null;
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout, handleAuthError, role, setRole, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
