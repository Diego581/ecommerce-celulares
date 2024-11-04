// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import EquipoList from './pages/EquipoList';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <AuthProvider>
            <Router>
            <div className="container">
                    <Navbar /> {/* Incluimos el Navbar aquí */}
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/equipos" element={<EquipoList />} />
                    </Routes>
            </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
