import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Signup.css';  // Import the CSS file

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state to indicate request is in progress
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async () => {
        // Validate input fields
        if (!formData.username || !formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        setLoading(true); // Start loading when the request is being made
        setError(''); // Clear any previous errors

        try {
            // Make the POST request to the backend using axios
            const response = await axios.post('http://localhost:5000/api/signupUser', formData);

            console.log(response);

            if (response.status === 201) {
                alert('User created successfully');
                // Successful signup, navigate to login page
                navigate('/login');
            }
        } catch (err) {

            if(err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
            // Handle errors (e.g., network issues, API errors)
            setError('Signup failed. Please try again.');
            }
        } finally {
            setLoading(false); // Stop loading when the request is done
        }
    };

    const handleLoginRedirect = () => {
        // Navigate to the login page when the user clicks on the login link
        navigate('/login');
    };

    return (
        <div>
            <h1>Signup</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />
            <br />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <br />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <br />
            <button onClick={handleSignup} disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <br />
            <p>
                Already have an account? 
                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleLoginRedirect}>
                    Login here
                </span>
            </p>
        </div>
    );
};

export default Signup;
