import Swal from "sweetalert2";
import {API_URL} from "@/Constant/GlobalConstants";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

/**
 * @param token
 * @param formType
 * @description This is the function that will be called when the form is submitted. It will
 * take data, token, and formType as parameters. The data parameter is the data that is sent
 * from the form. The token parameter is the token that is sent from the redux store. The
 * formType parameter is a boolean value that determines whether the form is for creating
 * a new taxi company or updating an existing one. If the formType is true, it means that
 * the form is for updating an existing taxi company driver. If the formType is false, it means
 * that the form is for creating a new taxi company driver.
 * */
export default function SubmitDriverData(token, formType) {
    const [submitting, setSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState("pending");
    const {t} = useTranslation([
        "taxi_owner_company",
        "errors"
    ]);
    /**
     * @param data
     * @description This function will be called when the form is submitted.
     * */
    const submitData = React.useCallback((data) => {
        const formData = new FormData();
        // get image from data
        formData.append('name', data.name);
        formData.append('surname', data.surname);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);
        formData.append('company_id', data.company_id);
        formData.append('is_active', data.is_active);
        formData.append('phone', data.phone);
        formData.append('gsm', data.gsm);
        formData.append('gender', data.gender);
        formData.append('avatar', data.avatar);
        formData.append('biography', data.biography);

        if (formType) {
            formData.append("id", data.id);
        }
        axios.post(API_URL + 'drivers/' + (formType ? "update" : "create"), formData, {
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
                            title: formType ? t("taxi_owner_drivers:driver_updated") : t("taxi_owner_company:driver_created"),
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
                title: t("errors:" + e.response.data.message),
                showConfirmButton: false,
                timer: 1500
            })
            setSubmitting(false);
            setIsCompleted("error");
        });
    }, []);

    return {submitData, submitting, isCompleted};
}
