
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import  UserList  from './components/userList';
import Navbar from './components/Navbar';
import EquipoList from './components/EquipoList';
import  RegisterForm  from './components/auth/RegisterForm';
import  {PrivateRoute}  from './components/common/PrivateRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
            <div className="container">
                    <Navbar /> 
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/equipos" element={<EquipoList />} />
                        <Route path="/register" element={<RegisterForm />} />
                            <Route path="/dashboard"element={<PrivateRoute/>}/>
                    </Routes>
            </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
