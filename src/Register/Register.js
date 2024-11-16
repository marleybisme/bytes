import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [street_address, setStreet_address] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Ensure city has a value before writing to Firestore
            if (!city) {
                setError("City is required");
                return;
            }

            // Ensure state has a value before writing to Firestore
            if (!state) {
                setError("State is required");
                return;
            }

            // Ensure street address has a value before writing to Firestore
            if (!street_address) {
                setError("Street Address is required");
                return;
            }

            // Ensure zip has a value before writing to Firestore
            if (!zipcode) {
                setError("Zipcode is required");
                return;
            }

            setError(''); // Clear previous errors

    // Validate input fields
    if (!email || !password || !city || !state || !street_address || !zipcode) {
        setError('All fields are required');
        return;
    }

    console.log('Email:', email);
    console.log('Password:', password);

            // Store user details in Firestore
            await setDoc(doc(db, 'user', user.uid), {
                email: user.email,
                city: city,
                state: state,
                street_address: street_address,
                zipcode: zipcode
            });
            console.log(user)
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Create Your Account</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Street Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={street_address}
                                        onChange={(e) => setStreet_address(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Zipcode</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={zipcode}
                                        onChange={(e) => setZipcode(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </form>
                            <div className="text-center mt-3">
                                Already have an account? <button className="btn btn-link" onClick={() => navigate('/login')}>Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
