import React, {useState} from "react";
import DataTable from "react-data-table-component";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ExpandedTaxiOwnerVehicleComponent
    from "../../../../Components/DataTables/ExpandedComponents/TaxiOwners/Vehicles/ExpandedTaxiOwnerVehicleComponent";
import SubHeaderComponent from "@/Components/DataTables/SubHeaderComponent/SubHeaderComponent";
import {toast} from "react-toastify";
import {API_URL} from "@/Constant/GlobalConstants";
import {useSelector} from "react-redux";
import Loader from "@/Components/Common/Loader/Loader";
import ExpandedTaxiOwnerPassengerComponent
    from "@/Components/DataTables/ExpandedComponents/TaxiOwners/Passengers/ExpandedTaxiOwnerPassengerComponent";

const PassengerListTable = ({passengers, isLoading }) => {

    const navigate = useNavigate();
    const {token} = useSelector(state => state.auth);

    const [filter, setFilter] = useState({
        filteredData: [],
        text: '',
        isFilter: false
    });

    const {t} = useTranslation([
        "passengers",
        "common"
    ]);

    const deletePassengerHandler = (id) => {
        axios.post(API_URL + 'vehicles/delete', {
            id: id
        }, {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
            }
        }).then(res => {
            if (res.data.status === 201) {
                toast.success(t("vehicles:delete_vehicle_success"));
                navigate('/taxi-owner/vehicles', {replace: true});
            } else {
                toast.error(t("vehicles:delete_vehicle_failed"));
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const filterData = (e) => {
        const filterText = e.target.value;
        if (filterText !== '') {
            const filteredItems = companies.filter(
                (item) => (
                    item.id && item.id.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
                )
            );
            setFilter({
                filteredData: filteredItems,
                text: filterText,
                isFilter: true
            });
        } else {
            setFilter({
                filteredData: [],
                text: '',
                isFilter: false
            });
        }
    }

    return (
        <>
            {isLoading ? <Loader/> :
                <div className="table-responsive mt-3">
                    <DataTable
                        columns={
                            [
                                {
                                    name: t("passengers:id"),
                                    selector: row => row.id,
                                    center: true,
                                },
                                {
                                    name: t("common:name"),
                                    selector: row => row.name,
                                    sortable: true
                                },
                                {
                                    name: t("common:edit"),
                                    button: true,
                                    cell: (row) => {
                                        return (
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => navigate(`/vehicles/update/${row.id}`, {replace: true})}
                                            >
                                                <i className="fa fa-edit"></i>
                                            </button>
                                        );
                                    },
                                    sortable: true
                                },
                                {
                                    name: t("common:detail"),
                                    button: true,
                                    cell: (row) => {
                                        return (
                                            <button
                                                className="btn btn-info"
                                                onClick={() => alert("Detail")}
                                            >
                                                <i className="fa fa-info"></i>
                                            </button>
                                        );
                                    },
                                    sortable: true
                                },
                                {
                                    name: t("common:delete"),
                                    button: true,
                                    cell: (row) => {
                                        return (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deletePassengerHandler(row.id)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        );
                                    },
                                    sortable: true
                                }
                            ]
                        }
                        subHeader={true}
                        responsive={true}
                        hover={true}
                        fixedHeader
                        pagination
                        expandableRows
                        expandableRowsComponent={ExpandedTaxiOwnerPassengerComponent}
                        data={(filter.isFilter) ? filter.filteredData : passengers}
                        subHeaderComponent={<SubHeaderComponent
                            filter={filterData}
                            action={{
                                uri: () => navigate("/passengers/create", {replace: true}),
                                title: t("passengers:add_passenger"),
                                class: "btn btn-success btn-sm me-2"
                            }}
                        />}
                    />
                </div>
            }
        </>
    );
};

export default PassengerListTable;
