import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserList from './components/userList';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import EquipoList from './components/EquipoList';
import RegisterForm from './components/auth/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import EquipoForm from './components/EquipoForm';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/users" element={<ProtectedRoute element={<UserList />} requiredRole="admin" />} />
                        <Route path="/users/:id" element={<ProtectedRoute element={<UserForm />} requiredRole="admin" />} />
                        <Route path="/equipos" element={<ProtectedRoute element={<EquipoList />} />} />
                        <Route path="/equipos/:id" element={<ProtectedRoute element={<EquipoForm />} />} />
                        <Route path="/editar" element={<ProtectedRoute element={<UserForm />} requiredRole="admin" />} />
                        <Route path="/create_equipo" element={<EquipoForm />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
