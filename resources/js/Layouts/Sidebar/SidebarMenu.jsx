import React from 'react';
import MenuItems from "./MenuItems";

const SidebarMenu = ({userType}) => {
    return (
        <nav>
            <div className="main-navbar">
                <div className="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
                <div id="mainnav">
                    <MenuItems userType={userType}/>
                </div>
                <div className="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
            </div>
        </nav>
    );
}

export default SidebarMenu;
