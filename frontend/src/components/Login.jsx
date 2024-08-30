import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiDiamonds } from "react-icons/gi";
import { loginUser, validateEmail } from '../services/AuthServices';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/todos');
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const login = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("All fields are required!!");
        }

        if (password.length < 6) {
            return toast.error("Invalid password!!");
        }

        if (!validateEmail(email)) {
            return toast.error("Invalid email");
        }

        const userData = {
            email,
            password
        }

        try {
            const data = await loginUser(userData);
            localStorage.setItem('token', data.token);
            navigate('/todos');
        } catch (error) {
            return toast.error(error.message);
        }

    }

    return (
      <div className="wrapper">
        <div className="card">
          <GiDiamonds size={50} />
          <h1>Log in</h1>
          <form onSubmit={login}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
          <span>Don't have an account?</span>
          <Link
            to="/register"
            className="link"
            style={{ textDecoration: "none" }}
          >
            <span>Register</span>
          </Link>
        </div>
      </div>
    );
}

export default Login;