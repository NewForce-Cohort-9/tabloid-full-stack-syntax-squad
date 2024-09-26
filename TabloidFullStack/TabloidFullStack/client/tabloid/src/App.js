import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import Authorize from './components/Authorize';

import 'bootstrap/dist/css/bootstrap.min.css';

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
