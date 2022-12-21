import {Cards} from "@/AbstractElements";
import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import SubscriptionsForm from "../../../Components/Forms/Management/Subscription/SubscriptionsForm";

export default function CreateSubscriptionPackage() {
    const {t} = useTranslation(["super_admin_subscription_packages"]);
    const {token} = useSelector(state => state.auth);
    return (
        <Cards title={t("super_admin_subscription_packages:create_subscription_package")}
               subTitle={t("super_admin_subscription_packages:create_subscription_package_description")}>
            <SubscriptionsForm formType={true} token={token} />
        </Cards>
    );
};
