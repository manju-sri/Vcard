// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import VCard from './components/VCard';
import Login from './components/Login';
import { PrivateRoute } from './firebase'; // Import the PrivateRoute

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route 
                        path="vcard" 
                        element={
                            <PrivateRoute>
                                <VCard />
                            </PrivateRoute>
                        } 
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
