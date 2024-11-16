import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Firebase Auth: Sign in the user with email and password
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to the homepage upon successful login
            navigate('/');
            console.log("success!")
        } catch (error) {
            // Handle errors, e.g., incorrect credentials
            setError('Login failed. Please check your credentials and try again.');
            console.error("Error during sign-in:", error.message);
        }
    };

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col xl={10}>
                        <Card className="rounded-3 text-black">
                            <Row className="g-0">
                                <Col lg={6} className="d-flex flex-column align-items-center p-5">
                                    <div className="text-center mb-4">
                                        <img
                                            src="./official_logo.png"
                                            alt="Study Buddy Logo"
                                            className="img-logo"
                                        />
                                        <h4 className="mt-1 mb-5">Welcome Back to Study Buddy!</h4>
                                    </div>
                                    {error && <p className="text-danger">{error}</p>}
                                    <Form onSubmit={handleLogin}>
                                        <Form.Group className="mb-4" controlId="formEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-4" controlId="formPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <div className="text-center pt-1 mb-5 pb-1">
                                            <Button variant="primary" type="submit" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">
                                                Log in
                                            </Button>
                                            <div></div>
                                            <a className="text-muted" href="#!">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </Form>
                                    <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">Don't have an account?</p>
                                        <Button variant="outline-primary" onClick={() => navigate('/register')}>
                                            Create new
                                        </Button>
                                    </div>
                                </Col>
                                <Col lg={6} className="d-flex align-items-center bg-primary-gradient">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">Unlock Your Academic Potential</h4>
                                        <p className="small mb-0">
                                            At Study Buddy, we believe in empowering students to excel academically
                                            and build lasting connections. Join us and start your journey toward success.
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Login;
