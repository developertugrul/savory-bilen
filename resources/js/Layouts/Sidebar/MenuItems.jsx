import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import LanguageChanger from "@/Components/Common/i18n/LanguageChangerButtonsLogin";
import {
    FaCarSide,
    FaTaxi,
    FcBusiness,
    FcHome, FcManager, FcMoneyTransfer, FcOnlineSupport,
    FcStatistics,
    GrSecure,
    ImManWoman,
    SiYourtraveldottv
} from "react-icons/all";

const MenuItems = ({userType}) => {

    const {t} = useTranslation([
        "navigation"
    ]);
    return (
        <>
            <ul className="nav-menu custom-scrollbar">

                <li className="back-btn">
                    <div className="mobile-back text-end"><span>Back</span><i
                        className="fa fa-angle-right ps-2" aria-hidden="true"></i></div>
                </li>

                <li className="sidebar-main-title">
                    <div>
                        <h6><FcBusiness/> {t("navigation:company")}</h6>
                    </div>
                </li>
                <li><Link className="nav-link menu-title link-nav" to="/cafe-companies"><FaTaxi
                    style={{verticalAlign: "middle"}}/><span>{t("navigation:my_companies")}</span></Link></li>

                <li className="sidebar-main-title">
                    <div>
                        <h6><GrSecure/> {t("navigation:dashboard")}</h6>
                    </div>
                </li>
                <li><Link className="nav-link menu-title link-nav" to="/dashboard"><FcHome
                    style={{verticalAlign: "middle"}}/><span>{t("navigation:dashboard")}</span></Link></li>


                {userType < 1 && <>
                    <li className="sidebar-main-title">
                        <div>
                            <h6><GrSecure/> {t("navigation:super_manager")}</h6>
                        </div>
                    </li>
                    <li><Link className="nav-link menu-title link-nav" to="/manager"><FcManager
                        style={{verticalAlign: "middle"}}/><span>{t("navigation:manager")}</span></Link></li>
                    <li><Link className="nav-link menu-title link-nav" to="/subscription-packages"><FcMoneyTransfer
                        style={{verticalAlign: "middle"}}/><span>{t("navigation:subscription_packages")}</span></Link></li>
                </>}
                <li><Link className="nav-link menu-title link-nav" to="/support">
                    <FcOnlineSupport/><span>{t("navigation:support")}</span></Link></li>
                <li>
                    <LanguageChanger/>
                </li>
            </ul>
        </>
    )
};

export default MenuItems
