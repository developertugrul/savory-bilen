import Swal from "sweetalert2";
import {API_URL} from "@/Constant/GlobalConstants";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

/**
 * @param token
 * @param formType
 * @description This is the function that will be called when the form is submitted. It will
 * take data, token, and formType as parameters. The data parameter is the data that is sent
 * from the form. The token parameter is the token that is sent from the redux store. The
 * formType parameter is a boolean value that determines whether the form is for creating
 * a new vehicle or updating an existing one. If the formType is true, it means that
 * the form is for updating an existing vehicle. If the formType is false, it means
 * that the form is for creating a new vehicle.
 * */
export default function SubmitVehicleData(token, formType) {
    const [submitting, setSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState("pending");
    const {t} = useTranslation([
        "vehicles",
        "errors",
        "common"
    ]);
    /**
     * @param data
     * @description This function will be called when the form is submitted to update or to create vehicle.
     * */
    const submitData = React.useCallback((data) => {
        setSubmitting(true);
        const formData = new FormData();
        // get image from data
        formData.append('name', data.name);
        formData.append("company_id", data.company_id);
        formData.append("category_id", data.category_id);
        formData.append("plate", data.plate);
        formData.append("brand", data.brand);
        formData.append("model", data.model);
        formData.append("color", data.color);
        formData.append("year", data.year);
        formData.append("fuel", data.fuel);
        formData.append("engine", data.engine);
        formData.append("chassis", data.chassis);
        formData.append("motor_kw", data.motor_kw);
        formData.append("motor_ps", data.motor_ps);
        formData.append("gearbox", data.gearbox);
        formData.append("km", data.km);
        formData.append("status", data.status);
        formData.append("image", data.image);
        formData.append("finNumber", data.finNumber);
        formData.append("keyNumber", data.keyNumber);
        formData.append("keyNumber2", data.keyNumber2);
        formData.append("purchaseDate", data.purchaseDate);
        formData.append("purchasePrice", data.purchasePrice);
        formData.append("purchaseKm", data.purchaseKm);
        formData.append("isSecondHand", data.isSecondHand);
        formData.append("licencePhoto", data.licencePhoto);
        formData.append("tuvDate", data.tuvDate);
        formData.append("konzessionDate", data.konzessionDate);
        formData.append("konzessionPhoto", data.konzessionPhoto);

        if (formType) {
            formData.append("id", data.id);
        }
        console.log(formData);
        axios.post(API_URL + 'vehicles/' + (formType ? "update" : "create"), formData, {
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
                            title: t("vehicles:" + res.data.message),
                            showConfirmButton: false,
                            timer: 2000
                        })
                        setSubmitting(false);
                        setIsCompleted("success");
                    }
                }
            ).catch(e => {
            let errorMessage = e.response.data.message;
            let firstError = errorMessage.split(" ")[0]
            Swal.fire({
                icon: 'error',
                title: t("errors:" + firstError),
                showConfirmButton: false,
                timer: 2000
            })
            setIsCompleted("error");
        });
        setSubmitting(false);
    }, []);

    return {submitData, submitting, isCompleted};
}
