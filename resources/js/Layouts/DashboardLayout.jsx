import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Outlet, useLocation} from "react-router-dom";
import {Fragment, useContext, useState} from "react";
import {ToastContainer} from 'react-toastify';
import Taptop from "./TapTop/TapTop";
import Loader from "./Loader/Loader";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import FooterClass from "./Footer/Footer"
import {useSelector} from "react-redux";
import Cookies from "js-cookie";

const DashboardLayout = ({
                             children,
                             classNames,
                             ...rest
                         }) => {

    const location = useLocation();
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const userType = useSelector(state => state.auth.userType);
    const user = useSelector(state => state.auth.user);
    const {token} = useSelector(state => state.auth);
    Cookies.set('token', token, { expires: 1, path: '/' })

    return (
        <Fragment>
            <Loader/>
            <Taptop/>
            <div className={`page-wrapper compact-wrapper`} id="pageWrapper">
                <Header user={user} isAuth={isAuth} />
                <div className="page-body-wrapper sidebar-icon">
                    {isAuth && <Sidebar userType={userType} user={user}/>}
                    <div className="page-body">
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                timeout={100}
                                classNames={"bounce"}
                                unmountOnExit
                            >
                                <Outlet/>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                    <FooterClass/>
                </div>
            </div>
            <ToastContainer/>
        </Fragment>
    );
};

export default DashboardLayout;
