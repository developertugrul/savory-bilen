import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AuthActions, CurrentToken} from "@/Store/Slices/Auth/AuthSlice";
import {useDispatch, useSelector} from "react-redux";
import Subscription from "@/Hooks/Subscription/Subscription";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useState} from "react";

const MainHeader = ({isAuth, user}) => {
    const currentToken = useSelector(CurrentToken);
    const [toggleHeader, setToggleHeader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const loginHandler = () => {
        // redirect to login page
        navigate('/login', {replace: true});
    };

    const logOutHandler = () => {
        // log out user
        axios({
            method: 'post',
            url: '/api/logout',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + currentToken
            }
        }).then((response) => {
            if (response.status === 200) {
                // redirect to login page
                Cookies.remove("state", {path: '/'});
                dispatch(AuthActions.logout());
                navigate('/login', {replace: true});
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const headerClass = !toggleHeader ? "nav-menus" : "nav-menus open";

    return (
        <>
            <div className="nav-right col pull-right right-menu p-0">
                <ul className={headerClass}>
                    <li><Link className="text-dark" to="#!"><i
                        data-feather="maximize"></i></Link></li>
                    <li className="onhover-dropdown">
                        <div className="bookmark-box"><i data-feather="star"></i></div>
                        <div className="bookmark-dropdown onhover-show-div">
                            <div className="form-group mb-0">
                                <div className="input-group">
                                    <div className="input-group-prepend"><span className="input-group-text"><i
                                        className="fa fa-search"></i></span></div>
                                    <input className="form-control" type="text" placeholder="Search for bookmark..."/>
                                </div>
                            </div>
                            <ul className="m-t-5">
                                <li className="add-to-bookmark"><i className="bookmark-icon"
                                                                   data-feather="inbox"></i>Email<span
                                    className="pull-right"><i data-feather="star"></i></span></li>
                                <li className="add-to-bookmark"><i className="bookmark-icon"
                                                                   data-feather="message-square"></i>Chat<span
                                    className="pull-right"><i data-feather="star"></i></span></li>
                                <li className="add-to-bookmark"><i className="bookmark-icon" data-feather="command"></i>Feather
                                    Icon<span className="pull-right"><i data-feather="star"></i></span></li>
                                <li className="add-to-bookmark"><i className="bookmark-icon" data-feather="airplay"></i>Widgets<span
                                    className="pull-right"><i data-feather="star">   </i></span></li>
                            </ul>
                        </div>
                    </li>
                    <li className="onhover-dropdown">
                        <div className="notification-box"><i data-feather="bell"></i><span
                            className="dot-animated"></span>
                        </div>
                        <ul className="notification-dropdown onhover-show-div">
                            <li>
                                <p className="f-w-700 mb-0">You have 3 Notifications<span
                                    className="pull-right badge badge-primary badge-pill">4</span></p>
                            </li>
                            <li className="noti-primary">
                                <div className="media"><span className="notification-bg bg-light-primary"><i
                                    data-feather="activity"> </i></span>
                                    <div className="media-body">
                                        <p>Delivery processing </p><span>10 minutes ago</span>
                                    </div>
                                </div>
                            </li>
                            <li className="noti-secondary">
                                <div className="media"><span className="notification-bg bg-light-secondary"><i
                                    data-feather="check-circle"> </i></span>
                                    <div className="media-body">
                                        <p>Order Complete</p><span>1 hour ago</span>
                                    </div>
                                </div>
                            </li>
                            <li className="noti-success">
                                <div className="media"><span className="notification-bg bg-light-success"><i
                                    data-feather="file-text"> </i></span>
                                    <div className="media-body">
                                        <p>Tickets Generated</p><span>3 hour ago</span>
                                    </div>
                                </div>
                            </li>
                            <li className="noti-danger">
                                <div className="media"><span className="notification-bg bg-light-danger"><i
                                    data-feather="user-check"> </i></span>
                                    <div className="media-body">
                                        <p>Delivery Complete</p><span>6 hour ago</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="mode"><i className="fa fa-moon-o"></i></div>
                    </li>
                    <li className="onhover-dropdown"><i data-feather="message-square"></i>
                        <ul className="chat-dropdown onhover-show-div">
                            <li>
                                <div className="media"><img className="img-fluid rounded-circle me-3"
                                                            src="/assets/images/user/4.jpg" alt=""/>
                                    <div className="media-body"><span>Ain Chavez</span>
                                        <p className="f-12 light-font">Lorem Ipsum is simply dummy...</p>
                                    </div>
                                    <p className="f-12">32 mins ago</p>
                                </div>
                            </li>
                            <li className="text-center"><a className="f-w-700" href="javascript:void(0)">See All </a>
                            </li>
                        </ul>
                    </li>
                    {isAuth && (<li>
                        <div className="mode">
                            <Subscription/>
                        </div>
                    </li>)}
                    {isAuth ? (<li className="onhover-dropdown p-0">
                        <button className="btn btn-primary-light" type="button" onClick={logOutHandler}><Link to="#"><i
                            data-feather="log-out"></i>{t("navigation:logout")}</Link></button>
                    </li>) : (<li className="onhover-dropdown p-0">
                        <button className="btn btn-primary-light" type="button" onClick={loginHandler}><Link
                            to="/login"><i
                            data-feather="log-in"></i>{t("navigation:login")}</Link></button>
                    </li>)}
                </ul>
            </div>
            <div className="d-lg-none mobile-toggle pull-right w-auto">
                <button className={"bg-transparent border-0"} onClick={() => setToggleHeader(!toggleHeader)}>
                    <BsThreeDotsVertical/>
                </button>
            </div>
        </>
    );
};

export default MainHeader;
