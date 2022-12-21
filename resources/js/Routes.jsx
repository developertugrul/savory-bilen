import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

import Index from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import HomeDashboard from "./Pages/Dashboard/Home/HomeDashboard";
import DashboardLayout from "./Layouts/DashboardLayout";

export default function MyRoutes() {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const userType = useSelector(state => state.auth.userType);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardLayout/>}>
                    <Route path="/" element={<Index/>}/>
                    {isAuth && <>
                        <Route path="dashboard" element={<HomeDashboard/>}/>
                        <Route path="support" element={<h1>support dashboard</h1>}/>
                        {userType < 2 && <>
                            <Route path="statistics" element={<h1>statistics dashboard</h1>}>
                                <Route path="companies" element={<h1>companies statistics</h1>}/>
                                <Route path="drivers" element={<h1>driver statistics</h1>}/>
                                <Route path="vehicles" element={<h1>vehicle statistics</h1>}/>
                                <Route path="passengers" element={<h1>passenger statistics</h1>}/>
                            </Route>
                        </>}
                        {userType < 1 && <>
                            <Route path="manager" element={<h1>Manager Dashboard</h1>}/>
                        </>}
                    </>}
                </Route>
                {!isAuth && <>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </>}
                {!isAuth ? <Route path="*" element={<Navigate to="login"/>}/> :
                    <Route path="*" element={<Navigate to="/dashboard"/>}/>}
            </Routes>
        </Router>
    );
}
