import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

import Index from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import HomeDashboard from "./Pages/Dashboard/Home/HomeDashboard";
import DashboardLayout from "./Layouts/DashboardLayout";
import AuthLayout from "@/Layouts/Auth/AuthLayout/AuthLayout";

export default function MyRoutes() {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const userType = useSelector(state => state.auth.userType);
    return (
        <Router>
            <Routes>
                {isAuth && <>
                    <Route path="/dashboard" element={<DashboardLayout/>}>
                        <Route path="" element={<Index/>}/>
                        <Route path="panel" element={<HomeDashboard/>}/>
                        <Route path="support" element={<h1>support dashboard</h1>}/>
                        {userType < 2 && <>
                            <Route path="statistics" element={<h1>statistics dashboard</h1>}>
                                <Route path="companies" element={<h1>companies statistics</h1>}/>
                                <Route path="drivers" element={<h1>driver statistics</h1>}/>
                                <Route path="vehicles" element={<h1>vehicle statistics</h1>}/>
                                <Route path="passengers" element={<h1>passenger statistics</h1>}/>
                            </Route>
                            <Route path="pages" element={<h1>Page list</h1>}>
                                <Route path="create" element={<h1>Page creation</h1>}/>
                                <Route path="update" element={<h1>Page update</h1>}/>
                                <Route path="detail" element={<h1>Page detail</h1>}/>
                            </Route>
                            <Route path="services" element={<h1>services list</h1>}>
                                <Route path="create" element={<h1>services creation</h1>}/>
                                <Route path="update" element={<h1>services update</h1>}/>
                                <Route path="detail" element={<h1>services detail</h1>}/>
                            </Route>
                            <Route path="blog" element={<h1>blog list</h1>}>
                                <Route path="create" element={<h1>blog creation</h1>}/>
                                <Route path="update" element={<h1>blog update</h1>}/>
                                <Route path="detail" element={<h1>blog detail</h1>}/>
                            </Route>
                            <Route path="subscription" element={<h1>subscription list</h1>}>
                                <Route path="create" element={<h1>subscription creation</h1>}/>
                                <Route path="update" element={<h1>subscription update</h1>}/>
                                <Route path="detail" element={<h1>subscription detail</h1>}/>
                            </Route>
                        </>}
                        {userType < 1 && <>
                            <Route path="manager" element={<h1>Manager Dashboard</h1>}/>
                        </>}
                    </Route>
                </>}
                {!isAuth && <>
                    <Route path="/auth" element={<AuthLayout/>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                    </Route>
                </>}
                {!isAuth ? <Route path="*" element={<Navigate to="/auth/login"/>}/> :
                    <Route path="*" element={<Navigate to="/dashboard"/>}/>}
            </Routes>
        </Router>
    );
}
