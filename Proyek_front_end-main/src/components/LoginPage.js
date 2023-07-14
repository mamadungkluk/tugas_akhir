import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './AuthPages.css';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:4545/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        alert("Login successful");
        navigate("/Home"); // Mengarahkan pengguna ke halaman beranda setelah login berhasil
      })
      .catch((error) => {
        alert("Login failed");
        console.error(error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Home"); // Jika pengguna sudah memiliki token, langsung arahkan ke halaman beranda
    }
  }, [navigate]);

  return (
    <div className="container">
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
        <div className="mt-3">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;
