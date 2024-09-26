// src/firebase.js
import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Navigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyCOYz4BTgF8nF0K8QEcUnxFz69Pl1tsBsQ",
    authDomain: "user-registration-aafb3.firebaseapp.com",
    projectId: "user-registration-aafb3",
    storageBucket: "user-registration-aafb3.appspot.com",
    messagingSenderId: "790738821203",
    appId: "1:790738821203:web:fa0e91b6a47861366126a6",
    databaseURL: "https://user-registration-aafb3-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// PrivateRoute Component
export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    return token ? children : <Navigate to="/" />;
};
