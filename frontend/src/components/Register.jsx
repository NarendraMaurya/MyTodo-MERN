import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiDiamonds } from "react-icons/gi";
import { registerUser, validateEmail } from '../services/AuthServices';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = formData;

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/todos');
            }
        } catch (error) {

        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const register = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            return toast.error("All fields are required!!");
        }

        if (password.length < 6) {
             return toast.error("Invalid password!!");
        }

        if (!validateEmail(email)) {
             return toast.error("Invalid email");
        }

        const userData = {
            username,
            email,
            password
        }

        try {
            const data = await registerUser(userData);
            localStorage.setItem('token', data.token);
            navigate('/todos');
        } catch (error) {
             return toast.error(error.message);
        }

    }

    return (
        <div className="wrapper">
            <div className='card'>
                <GiDiamonds size={50} />
                <h1>Register</h1>
                <form onSubmit={register}>
                    <input type="text" name="username" placeholder='Username' required value={username} onChange={handleInputChange} />
                    <input type="email" name="email" placeholder='Email' required value={email} onChange={handleInputChange} />
                    <input type="password" name="password" placeholder='Password' required value={password} onChange={handleInputChange} />
                    <button type='submit' className='btn btn-primary'>Register</button>
                </form>
                <span>Already have an account?</span>
                <Link to='/login' className='link' style={{ textDecoration: "none" }}>
                    <span>Login</span>
                </Link>
            </div>
        </div>
    )
}

export default Register;
