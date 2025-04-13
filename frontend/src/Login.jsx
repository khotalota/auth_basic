import React, { useState } from "react";
import axios from 'axios';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Reset any previous error messages
        setMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            });

            // Store tokens in localStorage
            localStorage.setItem('access', response.data.token.access);
            localStorage.setItem('refresh', response.data.token.refresh);

            // Set success message
            setMessage('Logged in Successfully!');

            // We'll add a small delay to ensure the user sees the success message
            // before redirecting to the HomePage
            setTimeout(() => {
                // Call the callback to notify parent component
                onLoginSuccess();
            }, 500);

        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message || err);
            setMessage(err.response?.data?.error || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {message && <p style={{ color: message.includes('Success') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
}

export default Login;
