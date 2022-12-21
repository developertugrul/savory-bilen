// Authentication Hook
// Check User is still authenticated
// If not, redirect to login page
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {AuthActions} from "@/Store/Slices/Auth/AuthSlice";
import {API_URL} from "@/Constant/GlobalConstants";
import Cookies from "js-cookie";

const useIsStillAuthenticated = () => {
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    axios.post(API_URL + "authentication", {},{
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        }
    }).then(res => {
        if (res.data.expires_at < new Date().getTime()) {
            dispatch(AuthActions.logout());
            Cookies.remove('state');
            return false;
        }
        return true;
    }).catch(e => {
        Cookies.remove("state", {path: "/"});
        dispatch(AuthActions.logout());
        return false;
    });
}

export default useIsStillAuthenticated;
