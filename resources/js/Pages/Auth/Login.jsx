import React, {useEffect} from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import classes from "./Login.module.css"
import LanguageChanger from "../../Components/Common/i18n/LanguageChangerButtonsLogin";

import {AuthActions} from "../../Store/Slices/Auth/AuthSlice";
import TextInput from "../../Components/FormElements/Input/TextInput";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {API_URL} from "@/Constant/GlobalConstants";

const Login = () => {
    // include some translations from resources\js\i18n.js
    const {t} = useTranslation([
        "login",
        "error"
    ]);
    //return (<div>Updating ...</div>);

    //useSelector(state => state.auth.isAuthenticated) && navigate('/dashboard', {replace: true});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [usernameError, setUsernameError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handelUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleUsernameBlur = () => {
        if (!username) {
            setUsernameError(t("warnings:username_required"));
        } else {
            setUsernameError("");
        }
    }

    const handlePasswordBlur = () => {
        if (!password) {
            setPasswordError(t("warnings:password_required"));
        } else {
            setPasswordError("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!username) {
            setUsernameError(t("warnings:username_required"));
        }
        if (!password) {
            setPasswordError(t("warnings:password_required"));
        }
        if (username && password) {
            axios.post(API_URL + "auth/login", {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((response) => {
                if (response.data.is_active == 1){
                    if (response.data.user_type < 4) {
                        dispatch(AuthActions.setCredentials({
                            user: response.data.user,
                            token: response.data.access_token,
                            userType: response.data.user_type,
                            expiresAt: response.data.expires_at
                        }));

                        // redirect to dashboard
                        navigate("/dashboard" , { replace: true });

                        Swal.fire({
                            icon: 'success',
                            title: t("success:success"),
                            text: t("success:login_success"),
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: t("errors:failed"),
                            text: t("errors:login_failed"),
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: t("errors:failed"),
                        text: t("errors:login_failed"),
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log(response.data)
            }).catch((error) => {
                // check error status
                switch (error.response.status) {
                    case 401:
                        Swal.fire({
                            icon: 'error',
                            title: t("errors:failed"),
                            text: t("errors:invalid_credentials"),
                            showConfirmButton: false,
                            timer: 1500
                        });
                        break;
                    case 500:
                        Swal.fire({
                            icon: 'error',
                            title: t("errors:failed"),
                            text: t("errors:server_error"),
                            showConfirmButton: false,
                            timer: 1500
                        });
                        break;

                    default:
                        Swal.fire({
                            icon: 'error',
                            title: t("errors:failed"),
                            text: t("errors:unknown_error"),
                            showConfirmButton: false,
                            timer: 1500
                        });
                        break;
                }
            });
        }
        setIsSubmitting(false);
    }

    // read redux state


    return (
        <section>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12">
                        <div className="login-card">
                            <form className={classes.loginForm} onSubmit={handleSubmit}>
                                <div className="text-center">
                                    <LanguageChanger/>
                                </div>
                                <h4>{t("login:login")}</h4>
                                <p className={classes.subtitle}>{t("login:intro")}</p>
                                <TextInput name="username" onChange={handelUsernameChange} id={"username"}
                                           label={t("login:username")} type="text" layout={"form-group"}
                                           onBlur={handleUsernameBlur} error={usernameError}
                                           placeholder={t("login:username")} />
                                <TextInput name="password" id={"password"} onChange={handlePasswordChange}
                                           onBlur={handlePasswordBlur} placeholder={t("login:password")} label={t("login:password")}
                                           type="password" error={passwordError} layout={"form-group"}/>
                                <div className="form-group">
                                    <div className="checkbox p-0">
                                        <input id="checkbox1" type="checkbox"/>
                                        <label htmlFor="checkbox1">{t("login:remember_me")}</label>
                                    </div>
                                    <div>
                                        <Link to={"/forget-password"}>{t("login:forgot_password")}</Link>
                                        / <Link to={"/register"}>{t("login:register")}</Link>
                                    </div>
                                    <button className="btn btn-success btn-sm" type="submit">{t("login:log-in")}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
