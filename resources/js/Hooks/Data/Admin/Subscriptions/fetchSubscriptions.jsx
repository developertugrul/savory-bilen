import React from "react";
import {useSelector} from "react-redux";
import Swal from "sweetalert2";
import {API_URL} from "@/Constant/GlobalConstants";

export default function fetchSubscriptions() {
    const [subscriptionList, setSubscriptions] = React.useState([]);
    const {token} = useSelector(state => state.auth);

    async function getSubs() {
        const response = await axios.post(API_URL + 'management/subscriptions', {}, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return response.data;
    }

    React.useEffect(() => {
        getSubs().then(data => {
            data.sort((a, b) => (a.label > b.label) ? 1 : -1);
            setSubscriptions(data);
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            });
        });
    }, []);

    return {subscriptionList};
}
