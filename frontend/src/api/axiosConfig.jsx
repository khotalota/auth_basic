// api/axiosConfig.js
import axios from 'axios';

// Get CSRF token from cookie
function getCsrfToken() {
  const name = 'csrftoken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
}

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'X-CSRFToken': getCsrfToken(),
  },
  withCredentials: true,  // Important for sending cookies with requests
});

export default api;
