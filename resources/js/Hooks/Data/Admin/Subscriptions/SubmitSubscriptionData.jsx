import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";
import {API_URL} from "@/Constant/GlobalConstants";

export default function SubmitSubscriptionData(token, formType) {
    const [submitting, setSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState("pending");
    const {t} = useTranslation([
        "super_admin_subscription_packages"
    ]);
    /**
     * @param data
     * @description This function will be called when the form is submitted.
     * */
    const submitData = React.useCallback((data) => {
        const formData = new FormData();
        // get image from data
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('max_company_number', data.max_company_number);
        formData.append('can_add_partner_firm', data.can_add_partner_firm);
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date);
        formData.append('status', data.status);
        if (formType) {
            formData.append("id", data.id);
        }
        axios.post(API_URL + 'management/subscriptions/' + (formType ? "create" : "update"), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
            }
        })
            .then(res => {
                    if (res.status === 201) {
                        Swal.fire({
                            icon: 'success',
                            title: formType ? t("super_admin_subscription_packages:subscription_package_created") : t("super_admin_subscription_packages:subscription_package_updated"),
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setSubmitting(false);
                        setIsCompleted("success");
                    }
                }
            ).catch(e => {
            Swal.fire({
                icon: 'error',
                title: formType ? t("super_admin_subscription_packages:subscription_package_create_error") : t("super_admin_subscription_packages:subscription_package_update_error"),
                showConfirmButton: false,
                timer: 1500
            })
            setSubmitting(false);
            setIsCompleted("error");
        });
    }, []);

    return {submitData, submitting, isCompleted};
}
