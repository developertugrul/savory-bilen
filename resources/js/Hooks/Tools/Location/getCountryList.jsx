import React from "react";
import {API_URL} from "@/Constant/GlobalConstants";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";

export default function getCountryList() {
    const [countries, setCountries] = React.useState([]);
    const {token} = useSelector(state => state.auth);

    async function getCountries() {
        const response = await axios.post(API_URL + 'countries', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return response.data;
    }

    React.useEffect(() => {
        let countryList = [];
        getCountries().then(data => {
            data.forEach(country => {
                const countryOption = {value: country.id, label: country.name};
                countryList.push(countryOption);
            });
            // sort country list by name
            countryList.sort((a, b) => (a.label > b.label) ? 1 : -1);
            setCountries(countryList);
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            });
        });
    }, []);

    return {countries};
}
