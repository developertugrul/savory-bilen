import {useState} from "react";
import {useSelector} from "react-redux";
import {API_URL} from "@/Constant/GlobalConstants";

const FetchCompanyData = (token) => {
    const [companies, setCompanies] = useState([]);
    const [singleCompany, setSingleCompany] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCompleted, setIsCompleted] = useState("pending");
    const [submitting, setSubmitting] = useState(false);
    const fetchCompanyData = React.useCallback(() => {
        axios.get(API_URL + 'companies', {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setCompanies(res.data.data);
                    setLoading(false);
                    setIsCompleted("success");
                }
            })
            .catch(e => {
                setLoading(false);
                setIsCompleted("error");
                setError(e);
            });
    }, []);

    const fetchSingleCompanyData = React.useCallback((id) => {
        axios.get(API_URL + 'companies/detail/' + id, {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setSingleCompany(res.data.data);
                    setLoading(false);
                    setIsCompleted("success");
                }
            }).catch(e => {
            setLoading(false);
            setIsCompleted("error");
        });
    }, []);

    return {
        companies,
        loading,
        error,
        isCompleted,
        submitting,
        setSubmitting,
        fetchCompanyData,
        singleCompany,
        fetchSingleCompanyData
    }
}
