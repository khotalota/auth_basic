import React from 'react';
import axios from 'axios';

function HomePage({ onLogout }) {
    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refresh');
        const accessToken = localStorage.getItem('access');

        if (!refreshToken || !accessToken) {
            console.error('Logout failed: Missing tokens');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            onLogout();
            return;
        }

        try {
            // Set up axios with the access token in the Authorization header
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            };

            // Send the refresh token in the request body
            await axios.post(
                'http://localhost:8000/api/logout/',
                { refresh_token: refreshToken },
                config
            );

            //console.log('Logout successful');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');

            // Call the onLogout callback to update App state
            onLogout();
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);

            // Even if the server request fails, we should still clear local tokens and log out
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            onLogout();
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Welcome, you are logged in!</h2>
            <button
                onClick={handleLogout}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default HomePage;
