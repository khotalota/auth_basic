import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';

function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if tokens exist on component mount to persist login state
        const accessToken = localStorage.getItem('access');
        if (accessToken) {
            console.log("Token found in localStorage, setting isLoggedIn to true");
            setIsLoggedIn(true);
        } else {
            console.log("No token found in localStorage");
        }
    }, []);

    const handleLoginSuccess = () => {
        //console.log("Login success callback triggered");
        setIsLoggedIn(true);
    };

    const handleLogoutSuccess = () => {
        //console.log("Logout success callback triggered");
        setIsLoggedIn(false);
    };

    // Debug logging for isLoggedIn state changes
    useEffect(() => {
        //console.log("isLoggedIn state changed to:", isLoggedIn);
    }, [isLoggedIn]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Authentication App</h1>
            {isLoggedIn ? (
                <>
                    <p>You are logged in!</p>
                    <HomePage onLogout={handleLogoutSuccess} />
                </>
            ) : (
                <>
                    <div style={{ margin: '10px 0' }}>
                        <button
                            onClick={() => setShowLogin(true)}
                            style={{
                                margin: '0 5px',
                                padding: '5px 10px',
                                backgroundColor: showLogin ? '#4CAF50' : '#f1f1f1'
                            }}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setShowLogin(false)}
                            style={{
                                margin: '0 5px',
                                padding: '5px 10px',
                                backgroundColor: !showLogin ? '#4CAF50' : '#f1f1f1'
                            }}
                        >
                            Register
                        </button>
                    </div>

                    {showLogin ?
                        <Login onLoginSuccess={handleLoginSuccess} /> :
                        <Register onRegisterSuccess={handleLoginSuccess} />}
                </>
            )}
        </div>
    );
}

export default App;
