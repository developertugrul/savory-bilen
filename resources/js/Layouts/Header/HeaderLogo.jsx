import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {HiOutlineMenuAlt2} from "react-icons/hi";
import {SideBarActions} from "@/Store/Slices/Layout/ToggleSidebarSlice";

const HeaderLogo = () => {
    const dispatch = useDispatch();
    return (
        <div className="main-header-left">
            <div className="logo-wrapper">
                <Link to="/dashboard">
                    <img className="img-fluid" src="/assets/images/logo/logo.png" alt=""/>
                </Link>
            </div>
            <div className="dark-logo-wrapper">
                <Link to="/dashboard">
                    <img className="img-fluid" src="/assets/images/logo/dark-logo.png" alt=""/>
                </Link>
            </div>
            <div className="toggle-sidebar" onClick={() => dispatch(SideBarActions.setSidebar())}>
                <HiOutlineMenuAlt2 style={{fontSize:"1.3rem"}} />
            </div>
        </div>
    );
}

export default HeaderLogo
