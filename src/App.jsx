import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import User from './user/pages/Users.jsx'
import NewPlace from "./places/pages/NewPlace.jsx";
import MainNavigation from "./shared/components/Navigation/MainNavigation.jsx";
import UserPlace from "./places/pages/UserPlace.jsx";
const App = () => {
    return (
        <>
        <MainNavigation />
            <main>
        <Routes>
         <Route path="/" element={<User />} />
            <Route path="/:userId/places" element={<UserPlace />}/>
            <Route path="/places/new" element={<NewPlace />} />
            {/* Catch-all route for any unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
            </main>
        </>
    );
};

export default App;