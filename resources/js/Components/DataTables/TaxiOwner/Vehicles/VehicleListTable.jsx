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

const VehicleListTable = ({companies, vehicles, vehicleCategories, isLoading}) => {

    const navigate = useNavigate();
    const {token} = useSelector(state => state.auth);

    const [filter, setFilter] = useState({
        filteredData: [],
        text: '',
        isFilter: false
    });

    const {t} = useTranslation([
        "vehicles",
        "common"
    ]);

    const deleteVehicleHandler = (id) => {
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
                    item.plate && item.plate.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.model && item.model.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.year && item.year.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.fuel && item.fuel.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.status && item.status.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.keyNumber && item.keyNumber.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.brand && item.brand.toLowerCase().includes(filterText.toLowerCase())
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

    const Loader = () => {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <>
            {isLoading ? <Loader/> :
                <div className="table-responsive mt-3">
                    <DataTable
                        columns={
                            [
                                {
                                    name: t("vehicles:plate"),
                                    selector: row => row.plate,
                                    center: true,
                                },
                                {
                                    name: t("vehicles:brand"),
                                    selector: row => row.brand,
                                    sortable: true
                                },
                                {
                                    name: t("vehicles:model"),
                                    selector: row => row.model,
                                    sortable: true
                                },
                                {
                                    name: t("vehicles:key_number"),
                                    selector: row => row.keyNumber,
                                    sortable: true
                                },
                                {
                                    name: t("vehicles:fuel"),
                                    button: true,
                                    cell: (row) => {
                                        if (row.fuel === 0) {
                                            return (
                                                <span className="badge bg-danger">{t("vehicles:gasoline")}</span>
                                            );
                                        } else if (row.fuel === 1) {
                                            return (
                                                <span className="badge bg-success">{t("vehicles:diesel")}</span>
                                            );
                                        } else if (row.fuel === 2) {
                                            return (
                                                <span className="badge bg-info">{t("vehicles:lpg")}</span>
                                            );
                                        } else if (row.fuel === 3) {
                                            return (
                                                <span className="badge bg-warning">{t("vehicles:hybrid")}</span>
                                            );
                                        } else if (row.fuel === 4) {
                                            return (
                                                <span className="badge bg-primary">{t("vehicles:electric")}</span>
                                            );
                                        } else {
                                            return (
                                                <span className="badge bg-secondary">{t("common:other")}</span>
                                            );
                                        }
                                    },
                                    sortable: true
                                },
                                {
                                    name: t("common:status"),
                                    button: true,
                                    cell: (row) => {
                                        if (row.status === 0) {
                                            return (
                                                <span className="badge bg-danger">{t("common:inactive")}</span>
                                            );
                                        } else {
                                            return (
                                                <span className="badge bg-success">{t("common:active")}</span>
                                            );
                                        }
                                    },
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
                                                onClick={() => navigate(`/vehicles/${row.id}`, {replace: true})}
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
                                                onClick={() => deleteVehicleHandler(row.id)}
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
                        expandableRowsComponent={ExpandedTaxiOwnerVehicleComponent}
                        data={(filter.isFilter) ? filter.filteredData : vehicles}
                        subHeaderComponent={<SubHeaderComponent
                            filter={filterData}
                            action={{
                                uri: () => navigate("/vehicles/create", {replace: true}),
                                title: t("vehicles:add_vehicle"),
                                class: "btn btn-success btn-sm me-2"
                            }}
                        />}
                    />
                </div>
            }
        </>
    );
};

export default VehicleListTable;
