import i18n from "i18next";
import ReactCountryFlag from "react-country-flag"
import "./LanguageChangerButtonsLogin.module.css";
const LanguageChangerButtonsLogin= () => {
    return (
        <div className={"text-center"}>
            <button type="button" className="btn hover" onClick={() => i18n.changeLanguage('en')} value="en">
                <ReactCountryFlag style={{
                fontSize: '2em',
                lineHeight: '2em',
            }} aria-label="United Kingdom" countryCode="US" svg />
            </button>
            <button type="button" className="btn hover" onClick={() => i18n.changeLanguage('tr')} value="tr">
                <ReactCountryFlag style={{
                    fontSize: '2em',
                    lineHeight: '2em',
                }} aria-label="Türkiye" countryCode="TR" svg /></button>
        </div>
    );
};

export default LanguageChangerButtonsLogin;
