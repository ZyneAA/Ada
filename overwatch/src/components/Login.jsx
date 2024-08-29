import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Simple validation (you can replace it with more complex logic)
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/bridge/v1/labyrinth/auth/overwatch",
                { "admin_name": username, "password": password },
                { withCredentials: true }
            )
            if(response.data.name) {
                navigate("/", { state: { login: true } })
            }
        }
        catch (err) {
            setError('Invalid Credentials')
        }

        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
