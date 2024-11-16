import React, { useState, useEffect } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase.js';


function Home({setUser}) {
    const [household_members, setHousehold_members] = useState(0);
    const [insurance, setInsurance] = useState('');
    const [own_car, setOwn_car] = useState(false);
    const [own_property, setOwn_property] = useState(false);
    const [pets, setPets] = useState(0);
    const [training, setTraining] = useState(false);
    const [userID, setUserID] = useState('')

    const handleLogout = () => {
        auth.signOut().then(() => setUser(null)); // Log out user
    };

    //const navigate = useNavigate();

    // Get current user ID when authenticated
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
            }
        });
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            if (name === 'own_car') setOwn_car(checked);
            if (name === 'own_property') setOwn_property(checked);
            if (name === 'training') setTraining(checked);
        } else {
            if (name === 'household_members') setHousehold_members(value);
            if (name === 'insurance') setInsurance(value);
            if (name === 'pets') setPets(value);
        }
    };

    const handleSubmit = async (event) => {
        console.log("Authenticated user ID:", userID);
        event.preventDefault();
        console.log({
            userID,
            household_members,
            insurance,
            own_car,
            own_property,
            pets,
            training
        }); 
        try {
            await addDoc(collection(db, "info"), {
                userID,
                household_members,
                insurance,
                own_car,
                own_property,
                pets,
                training
            });
            alert("Quiz completed successfully!");  // Alert notification
        } catch (error) {
            console.error("Error submitting quiz.", error.code, error.message, error);
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Disaster Relief</h1>
            </header>
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            <nav className="home-nav">
                <ul>
                    <li><a href="#">Pre-Relief</a></li>
                    <li><a href="#">During Disaster</a></li>
                    <li><a href="#">Post-Relief</a></li>
                    <li><a href="#">My Profile</a></li>
                </ul>
            </nav>
            <main className="home-main">
                <section className="home-section">
                    <div className="carousel-container">
                        <button>Previous</button>
                        <button>Next</button>
                    </div>
                    <div className="flex-container">
                        <div className="flex-item">
                            <p>Placeholder Text 1</p>
                        </div>
                        <div className="flex-item">
                            <p>Placeholder Text 2</p>
                        </div>
                        <div className="flex-item">
                            <p>Placeholder Text 3</p>
                        </div>
                    </div>
                    <button onClick={() => document.getElementById('quizModal').style.display = 'block'}>Take the Quiz</button>
                </section>
            </main>
            <div id="quizModal" className="home-quiz-modal" style={{ display: 'none' }}>
                <div className="home-quiz-content">
                    <h2>Disaster Relief Quiz</h2>
                    <button onClick={() => document.getElementById('quizModal').style.display = 'none'}>×</button>
                    <form onSubmit={handleSubmit}>
                        <label>
                            How many members are there in your household?
                            <input type="number" name="household_members" value={household_members} onChange={handleChange} />
                        </label>
                        <label>
                            Who is your current insurance provider?
                            <input type="text" name="insurance" value={insurance} onChange={handleChange} />
                        </label>
                        <label>
                            Do you own a car?
                            <input type="checkbox" name="own_car" checked={own_car} onChange={handleChange} />
                        </label>
                        <label>
                            Do you own a home or any other real estate property?
                            <input type="checkbox" name="own_property" checked={own_property} onChange={handleChange} />
                        </label>
                        <label>
                            How many pets do you have?
                            <input type="number" name="pets" value={pets} onChange={handleChange} />
                        </label>
                        <label>
                            Have you received any disaster relief training?
                            <input type="checkbox" name="training" checked={training} onChange={handleChange} />
                        </label>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => document.getElementById('quizModal').style.display = 'none'}>Close</button>
                    </form>
                </div>
            </div>
            <footer className="home-footer">
                <p>Thank you for using LifeStrike!</p>
            </footer>
        </div>
    );
}

export default Home;
