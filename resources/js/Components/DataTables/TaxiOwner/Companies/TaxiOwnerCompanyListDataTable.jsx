import DataTable from 'react-data-table-component';
import TaxiOwnerCompanyListDataTableExpandedComponents
    from "../../ExpandedComponents/TaxiOwners/Company/TaxiOwnerCompanyListDataTableExpandedComponents";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import SubHeaderComponent from "@/Components/DataTables/SubHeaderComponent/SubHeaderComponent";
import {BsClipboard, BsClipboardCheck, GrAnnounce} from "react-icons/all";

const TaxiOwnerCompanyListDataTable = (props) => {

    const companies = props.companies;
    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        filteredData: [],
        text: '',
        isFilter: false
    });

    const {t} = useTranslation([
        "taxi_owner_company",
        "common"
    ]);

    const filterData = (e) => {
        const filterText = e.target.value;
        if (filterText !== '') {
            const filteredItems = companies.filter(
                (item) => (
                    item.company_name && item.company_name.toLowerCase().includes(filterText.toLowerCase()) ||
                    item.tax_no && item.tax_no.toLowerCase().includes(filterText.toLowerCase())
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
        <div className="table-responsive mt-3">
            <DataTable
                columns={
                    [
                        {
                            name: t("taxi_owner_company:company_name"),
                            selector: row => row.company_name,
                            center: true,
                        },
                        {
                            name: t("taxi_owner_company:tax_number"),
                            selector: row => row.tax_no,
                            sortable: true
                        },
                        {
                            name: t("taxi_owner_company:is_active"),
                            selector: row => row.is_active,
                            sortable: true
                        },
                        {
                            name: t("common:marketing"),
                            button: true,
                            cell: (row) => {
                                return (
                                    <button
                                        className="btn btn-success text-white"
                                        onClick={() => props.onEdit(row.id)}
                                    >
                                        <GrAnnounce color="white"/>
                                    </button>
                                );
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
                                        onClick={() => props.onEdit(row.id)}
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
                                        onClick={() => props.getDetail(row.id)}
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
                                        onClick={() => props.onDelete(row.id)}
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
                expandableRowsComponent={TaxiOwnerCompanyListDataTableExpandedComponents}
                data={(filter.isFilter) ? filter.filteredData : companies}
                subHeaderComponent={<SubHeaderComponent
                    filter={filterData}
                    action={{
                        uri: () => navigate("/taxi-companies/create", {replace: true}),
                        title: t("taxi_owner_company:add_taxi_company"),
                        class: "btn btn-success btn-sm me-2"
                    }}
                />}
            />
        </div>
    );
};

export default TaxiOwnerCompanyListDataTable;
