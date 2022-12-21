import SidebarMenu from "./SidebarMenu";
import Profile from "./Profile"
import React from 'react';
import {useSelector} from "react-redux";
import useIsStillAuthenticated from "@/Hooks/Auth/useIsStillAuthenticated";

const Sidebar = ({user,userType}) => {
    const toggle = useSelector(state => state.toggleSidebar.sidebar);
    let toggling = toggle ? 'main-nav' : 'main-nav close_icon';
    useIsStillAuthenticated();
    return (
        <header className={toggling}>
            <Profile user={user} userType={userType} />
            <SidebarMenu userType={userType}/>
        </header>
    );
}

export default Sidebar
