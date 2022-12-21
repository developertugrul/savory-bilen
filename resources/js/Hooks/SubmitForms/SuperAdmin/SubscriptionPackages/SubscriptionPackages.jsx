/**
 * @param token
 * @param formType
 * @description This component will be used to create or update a taxi company.
 * */
import {useState} from "react";
import {useTranslation} from "react-i18next";

export default function SubscriptionPackages ({token, formType}){
    const {t} = useTranslation([
        "super_admin_subscription_packages"
    ]);
    const [submitting, setSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState("pending");

    const submitData = (data) => {
      const formData = new FormData();
    }
}
