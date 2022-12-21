import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import MainHeader from "./MainHeader";
import {useSelector} from "react-redux";

const Header = ({user, isAuth}) => {
    const toggle = useSelector(state => state.toggleSidebar.sidebar);
    let toggling = toggle ? 'page-main-header' : 'page-main-header close_icon';
    return (
        <div className={toggling}>
            <div className={"main-header-right row m-0"}>
                <HeaderLogo/>
                <HeaderSearch/>
                <MainHeader isAuth={isAuth} user={user} />
            </div>
        </div>
    );
}

export default Header
