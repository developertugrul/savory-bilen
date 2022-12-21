import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Outlet, useNavigate} from "react-router-dom";
import {API_URL} from "@/Constant/GlobalConstants";
import {useSelector} from "react-redux";
import {Breadcrumbs, Cards} from "@/AbstractElements";
import fetchSubscriptions from "../../../Hooks/Data/Admin/Subscriptions/fetchSubscriptions";
import {AiOutlineEdit, BsTrash} from "react-icons/all";

const SubscriptionList = () => {
    const {subscriptionList} = fetchSubscriptions();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {token} = useSelector(state => state.auth);

    const {t} = useTranslation([
        "super_admin_subscription_packages"
    ]);

    console.log(subscriptionList)

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const deleteHandler = (id) => {
        axios.delete(API_URL + 'subscriptions/' + id, {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);

            })
    }
    return (
        <>
            <Breadcrumbs mainTitle={t("super_admin_subscription_packages:subscription_package")}
                         title={t("super_admin_subscription_packages:subscription_package")}>
                <button className={"float-end btn btn-success btn-sm"} onClick={() => navigate("/subscription-packages/create",{replace:true})}>{t("super_admin_subscription_packages:add_subscription_package")}</button>
            </Breadcrumbs>
            <Outlet />
            <Cards title={t("super_admin_subscription_packages:list_subscription_packages")}
                   subTitle={t("super_admin_subscription_packages:list_subscription_packages")}>
                <div className="row">
                    {subscriptionList.map((subscription, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="pricing-block card text-center">
                                <div className="pricing-header">
                                    <h2>{subscription.name}</h2>
                                </div>
                                <div className="pricing-list">
                                    <button className="btn btn-primary btn-sm m-1" type="button"
                                            onClick={() => navigate('/admin/subscriptions/create/' + subscription.id, {replace: true})}
                                            data-original-title="btn btn-primary btn-sm" title="">
                                        <AiOutlineEdit />
                                    </button>
                                    <button className="btn btn-danger btn-sm m-1" type="button" onClick={deleteHandler}
                                            data-original-title="btn btn-danger btn-sm" title="">
                                        <BsTrash/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Cards>
        </>
    );
};

export default SubscriptionList;
