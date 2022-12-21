import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


const Login = () => {
    const {t} = useTranslation([
        "login"
    ]);
    return (
        <section>
            <div className="container-fluid p-0 text-center">
                <h4>Bu sayfa geçici olarak devre dışı bırakılmıştır.</h4>
                <Link to="/login">{t("login:login")}</Link> sayfasına yönlendiriliyorsunuz.
            </div>
        </section>
    );
}

export default Login;
