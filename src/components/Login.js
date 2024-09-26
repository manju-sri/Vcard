import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        const token = localStorage.getItem('accessToken');

        if (user || token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        setEmailError('');
        setPasswordError('');

        if (!email.trim()) {
            setEmailError('Email is required.');
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Invalid email format.');
            valid = false;
        }

        if (!password.trim()) {
            setPasswordError('Password is required.');
            valid = false;
        }

        if (!valid) return;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem('accessToken', token);
            alert('Login successfully');
            setEmail('');
            setPassword('');
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setPasswordError('Login failed: ' + err.message);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="row justify-content-center">
                <div className="col-16 col-sm-8 col-md-6 col-md-12 col-lg-14 col-xl-16 ">
                    <div className="bg-light p-4 shadow" style={{ 
                        borderRadius: '15px', 
                        border: '0.5px solid gray',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
                    }}>
                        <h1 className="text-center mb-4">Firebase Login</h1>
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError('');
                                    }}
                                    required
                                />
                                {emailError && <div className="invalid-feedback">{emailError}</div>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError('');
                                    }}
                                    required
                                />
                                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
