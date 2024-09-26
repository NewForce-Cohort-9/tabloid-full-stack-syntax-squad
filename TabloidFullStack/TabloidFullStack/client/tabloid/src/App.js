<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import ApplicationViews from "./Components/ApplicationViews";
import { useEffect } from 'react';
import Authorize from './Components/Authorize';
=======
import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import Authorize from './components/Authorize';
>>>>>>> main

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("userProfile")) {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ? (
                <ApplicationViews />
            ) : (
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            )}
        </div>
    );
}

export default App;
