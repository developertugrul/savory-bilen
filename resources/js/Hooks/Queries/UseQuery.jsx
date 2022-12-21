import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";

const UseQuery = ({toWhere, queryData = {}, queryType, token}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const {t} = useTranslation([
        "common",
        "errors"
    ]);

    const theQuery = () => {
        // if queryType is GET
        if (queryType === 'GET') {
            axios.get(toWhere, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json"
                }
            }).then(res => {
                setData(res.data);
                setLoading(false);
                setIsSuccess(true);
            }).catch(e => {
                setError(e.response);
                setLoading(false);
            });
        } else if (queryType === 'POST') {
            axios.post(toWhere, queryData, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                setData(res.data);
                setLoading(false);
            }).catch(e => {
                setError(e.response);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: t("errors:errors"),
                    text: t("errors:" + e.response.data.message),
                    confirmButtonText: t("common:ok")
                });
            });
        }
    }

    useEffect(() => {
        theQuery();
    }, []);

    return {data, loading, error, isSuccess};
}

export default UseQuery;
