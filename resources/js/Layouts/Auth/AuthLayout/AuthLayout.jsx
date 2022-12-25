import {Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Cookies from "js-cookie";
import {APP_NAME} from "@/Constant/GlobalConstants";

const AuthLayout = ({
                        children,
                        classNames,
                        ...rest
                    }) => {

    const location = useLocation();
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const userType = useSelector(state => state.auth.userType);
    const user = useSelector(state => state.auth.user);
    const {token} = useSelector(state => state.auth);
    Cookies.set('token', token, {expires: 1, path: '/'})
    return (
     <>
         <h1 className={"text-center text-secondary"}>Welcome to {APP_NAME}</h1>
         <Outlet/>
     </>
    );
};

export default AuthLayout;
