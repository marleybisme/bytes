import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import Register from "./Register/Register";
import { Route, Routes } from 'react-router-dom';
import Home from "./Home/Home"
import Login from "./Login/Login"

function App() {
    const [user, setUser] = useState(null);
   const [userData, setUserData] = useState({});

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return; // Exit if user is not defined yet
            try {
                const userRef = doc(db, 'user', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                    console.log(userDoc.data()); // Log the fetched data
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        fetchUserData();
    }, [user]); // Run this effect only when `user` changes

    return (
        <div>
            <Routes>
              <Route path="/" element={<Home user={user} setUser={setUser} userData={userData}/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Routes>
        </div>
    );
}

export default App;
