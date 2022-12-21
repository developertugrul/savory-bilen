import Swal from "sweetalert2";
import {API_URL} from "@/Constant/GlobalConstants";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

/**
 * @param data
 * @param token
 * @param formType
 * @description This is the function that will be called when the form is submitted. It will
 * take data, token, and formType as parameters. The data parameter is the data that is sent
 * from the form. The token parameter is the token that is sent from the redux store. The
 * formType parameter is a boolean value that determines whether the form is for creating
 * a new taxi company or updating an existing one. If the formType is true, it means that
 * the form is for updating an existing taxi company. If the formType is false, it means
 * that the form is for creating a new taxi company.
 * */
export default function SubmitCompanyData(token, formType) {
    const [submitting, setSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState("pending");
    const {t} = useTranslation([
        "taxi_owner_company"
    ]);
    /**
     * @param data
     * @description This function will be called when the form is submitted.
     * */
    const submitData = React.useCallback((data) => {
        const formData = new FormData();
        // get image from data
        formData.append('slug', data.slug);
        formData.append("primary_image", data.primary_image);
        formData.append("logo", data.logo);
        formData.append("company_name", data.company_name);
        formData.append("name", data.name);
        formData.append("surname", data.surname);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("gsm", data.gsm);
        formData.append("country", data.country);
        formData.append("address_region", data.address_region);
        formData.append("address_locality", data.address_locality);
        formData.append("postal_code", data.postal_code);
        formData.append("street_address", data.street_address);
        formData.append("latitude", data.latitude);
        formData.append("longitude", data.longitude);
        formData.append("price_range", data.price_range);
        formData.append("tax_no", data.tax_no);
        formData.append("tax_no2", data.tax_no2);
        formData.append("website", data.website);
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (formType) {
            formData.append("id", data.id);
        }
        axios.post(API_URL + 'companies/' + (formType ? "update" : "create"), formData, {
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
                            title: formType ? t("taxi_owner_company:taxi_company_updated") : t("taxi_owner_company:taxi_company_created"),
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
                title: formType ? t("taxi_owner_company:taxi_company_update_error") : t("taxi_owner_company:taxi_company_create_error"),
                showConfirmButton: false,
                timer: 1500
            })
            setSubmitting(false);
            setIsCompleted("error");
        });
    }, []);

    return {submitData, submitting, isCompleted};
}
