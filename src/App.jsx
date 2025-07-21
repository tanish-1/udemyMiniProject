import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import User from './user/pages/Users.jsx'
import NewPlace from "./places/pages/NewPlace.jsx";
const App = () => {
    return (
        <Routes>
         <Route path="/" element={<User />} />
            <Route path="/places/new" element={<NewPlace />} />
            {/* Catch-all route for any unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
    );
};

export default App;