import {useTranslation} from "react-i18next";
import {FUEL_TYPES, GEARBOX_TYPES} from "@/Constant/GlobalConstants";

const ExpandedTaxiOwnerVehicleComponent = (props) => {
    console.log(props);
    const {t} = useTranslation([
        "vehicles",
        "common"
    ]);
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title"> {props.data.plate} / {props.data.name}</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-header">
                                        <h6>
                                            {t("vehicles:vehicle_data")}
                                        </h6>
                                    </div>
                                    <div className="card-body table-responsive">
                                        <table className="table table-borderless table-border-horizontal table-striped">
                                            <tbody>
                                            <tr>
                                                <td>
                                                    {t("vehicles:plate")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.plate}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:brand")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.brand}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:model")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.model}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:color")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.color}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:year")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.year}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:fuel")}
                                                </td>
                                                <td className="text-right">
                                                    {FUEL_TYPES.map((fuelType) => {
                                                            if (fuelType.value === props.data.fuel) {
                                                                return t("vehicles:" + fuelType.label);
                                                            }
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:engine")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.engine}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:chassis")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.chassis}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:motor_kw")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.motor_kw}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:motor_ps")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.motor_ps}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:gearbox")}
                                                </td>
                                                <td className="text-right">
                                                    {GEARBOX_TYPES.map((gearbox) => {
                                                            if (gearbox.value === props.data.gearbox) {
                                                                return t("vehicles:" + gearbox.label);
                                                            }
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:km")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.km}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:status")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.status}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:fin_number")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.finNumber}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:key_number")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.keyNumber}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:key_number2")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.keyNumber2}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:purchase_date")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.purchaseDate}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:purchase_price")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.purchasePrice}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:purchase_km")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.purchaseKm}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:tuv_date")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.tuvDate}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:konzession_date")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.konzessionDate}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {t("vehicles:is_second_hand")}
                                                </td>
                                                <td className="text-right">
                                                    {props.data.isSecondHand ? t("vehicles:yes") : t("vehicles:no")}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="card">
                                    <div className="card-header">
                                        <h6>{t("vehicles:fuel_usage_history")}</h6>
                                    </div>
                                    <div className="card-body table-responsive">
                                        <table className="table table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>{t("vehicles:km")}</th>
                                                <th>{t("vehicles:liters")}</th>
                                                <th>{t("vehicles:price")}</th>
                                                <th>{t("vehicles:total_price")}</th>
                                                <th>{t("vehicles:total_km")}</th>
                                                <th>{t("vehicles:average_consumption")}</th>
                                                <th>{t("vehicles:average_price")}</th>
                                                <th>{t("vehicles:driver")}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className={"text-center bg-secondary text-white"} colSpan={8}>No Data Yet</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h6>{t("vehicles:service_history")}</h6>
                                    </div>
                                    <div className="card-body table-responsive">
                                        <table className="table table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>{t("vehicles:km")}</th>
                                                <th>{t("common:date")}</th>
                                                <th>{t("common:type")}</th>
                                                <th>{t("common:amount")}</th>
                                                <th>{t("common:description")}</th>
                                                <th>{t("common:customer")}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className={"text-center bg-secondary text-white"} colSpan={12}>No Data Yet</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ExpandedTaxiOwnerVehicleComponent;
