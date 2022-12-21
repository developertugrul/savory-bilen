import React from "react";
import {API_URL} from "@/Constant/GlobalConstants";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";

export default function getStateList(country_id) {
    const [states, setStates] = React.useState([]);
    const {token} = useSelector(state => state.auth);

    async function getStates(id) {
        const response = await axios.post(API_URL + 'states', {country_id:id}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return response.data;
    }

    React.useEffect(() => {
        let stateList = [];
        getStates(country_id).then(data => {
            data.forEach(state => {
                const stateOption = {value: state.id, label: state.name};
                stateList.push(stateOption);
            });
            // sort country list by name
            stateList.sort((a, b) => (a.label > b.label) ? 1 : -1);
            setStates(stateList);
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            });
        });
    }, []);

    return {states};
}
