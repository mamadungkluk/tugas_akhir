import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AuthPages.css';


function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleRegister = () => {
        axios
            .post("http://127.0.0.1:4545/register", {
                username: username,
                password: password,
                email: email,
            })
            .then((response) => {
                // Handle registration success
                alert("Registration successful");
                // Redirect to login page
                window.location.assign("/login");
            })
            .catch((error) => {
                // Handle registration failure
                alert("Registration failed");
                console.error(error);
            });
    };


    return (
        <div>
            <h2>Register</h2>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
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

                <Button variant="primary" onClick={handleRegister}>
                    Register
                </Button>
                <div>
                    Sudah punya akun? <Link to="/login">Login Di sini</Link>
                </div>
            </Form>
        </div>
    );
}

export default RegisterPage;
