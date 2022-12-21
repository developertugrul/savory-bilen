import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Input} from "reactstrap";
import BasicInput from "@/CommonElements/Input/BasicInput";
import {
    API_URL,
    FUEL_TYPES,
    GEARBOX_TYPES,
    KONZESION_IMAGE_PATH,
    LICENCE_IMAGE_PATH,
    VEHICLE_IMAGE_PATH
} from "@/Constant/GlobalConstants";
import SubmitVehicleData from "../../../Hooks/SubmitForms/TaxiOwner/Vehicle/SubmitVehicleData";

const VehicleForm = ({formType, vehicle = {}, token}) => {

    const {submitData, submitting, isCompleted} = SubmitVehicleData(token, formType);
    const [companies, setCompanies] = useState([]);
    const [vehicleCategories, setVehicleCategories] = useState([]);

    const {t} = useTranslation([
        "vehicles",
        "common",
        "errors"
    ]);

    const navigate = useNavigate();

    const fetchVehicles = () => {
        axios.post(API_URL + 'vehicles', {}, {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
            }
        }).then(response => {
            setCompanies(response.data.companies);
            setVehicleCategories(response.data.vehicle_categories);
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: t("errors:failed"),
                text: t("errors:" + error.response.data.message),
                showConfirmButton: false,
                timer: 1500
            });
        });
    }

    useEffect(() => {
        fetchVehicles();
    }, []);

    function handleSubmit(values, {resetForm}) {
        submitData(values);
    }

    if (isCompleted === "success") {
        navigate('/vehicles');
    }

    return (
        <Formik
            initialValues={{
                "id": formType ? vehicle.id : "0",
                "image": "",
                "name": formType ? vehicle.name : "",
                "company_id": formType ? vehicle.company_id : "",
                "category_id": formType ? vehicle.category_id : "",
                "plate": formType ? vehicle.plate : "",
                "brand": formType ? vehicle.brand : "",
                "model": formType ? vehicle.model : "",
                "color": formType ? vehicle.color : "",
                "year": formType ? vehicle.year : "",
                "fuel": formType ? vehicle.fuel : "",
                "engine": formType ? vehicle.engine : "",
                "chassis": formType ? vehicle.chassis : "",
                "motor_kw": formType ? vehicle.motor_kw : "",
                "motor_ps": formType ? vehicle.motor_ps : "",
                "gearbox": formType ? vehicle.gearbox : "",
                "km": formType ? vehicle.km : "",
                "status": formType ? vehicle.status : "",
                "finNumber": formType ? vehicle.finNumber : "",
                "keyNumber": formType ? vehicle.keyNumber : "",
                "keyNumber2": formType ? vehicle.keyNumber2 : "",
                "purchaseDate": formType ? vehicle.purchaseDate : "",
                "purchasePrice": formType ? vehicle.purchasePrice : "",
                "purchaseKm": formType ? vehicle.purchaseKm : "",
                "isSecondHand": formType ? vehicle.isSecondHand : "",
                "licencePhoto": "",
                "tuvDate": formType ? vehicle.tuvDate : "",
                "konzessionDate": formType ? vehicle.konzessionDate : "",
                "konzessionPhoto": "",
            }}
            onSubmit={handleSubmit}
            enableReinitialize={true}
        >{({
               values,
               handleChange,
               handleSubmit,
               handleBlur,
               errors,
               setFieldValue,
               touched
           }) => (
            <form className="theme-form">
                <div className="row">
                    <input type="hidden" required className="form-control" id="id" name="id" value={values.id}
                           onChange={handleChange} onBlur={handleBlur}/>
                    {(errors.id) && (
                        <div className={"text-danger"}>{errors.id}</div>)}
                    {formType ? <>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-3" style={{maxHeight: "20rem", overflow: "hidden"}}>
                                    <span>{t("vehicles:image")}</span>
                                    <img src={VEHICLE_IMAGE_PATH + vehicle.image} alt="avatar"
                                         className="img-fluid" style={{width: "100%"}}/>
                                </div>
                                <div className="col-md-3" style={{maxHeight: "20rem", overflow: "hidden"}}>
                                    <span>{t("vehicles:licence_photo")}</span>
                                    <img src={LICENCE_IMAGE_PATH + vehicle.licencePhoto} alt="avatar"
                                         className="img-fluid" style={{width: "100%"}}/>
                                </div>
                                <div className="col-md-3" style={{maxHeight: "20rem", overflow: "hidden"}}>
                                    <span>{t("vehicles:konzession_photo")}</span>
                                    <img src={KONZESION_IMAGE_PATH + vehicle.konzessionPhoto} alt="avatar"
                                         className="img-fluid" style={{width: "100%"}}/>
                                </div>
                            </div>
                        </div>
                    </> : <></>}
                    <BasicInput>
                        <label htmlFor="image" className="form-label">{t("vehicles:image")}</label>
                        <Input
                            type="file"
                            name="image"
                            id="image"
                            onChange={(event) => {
                                setFieldValue("image", event.currentTarget.files[0]);
                            }
                            }
                        />
                        {(errors.image && touched.image) && (<div className={"text-danger"}>{errors.image}</div>)}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="licencePhoto" className="form-label">{t("vehicles:licence_photo")}</label>
                        <Input
                            type="file"
                            name="licencePhoto"
                            id="licencePhoto"
                            onChange={(event) => {
                                setFieldValue("licencePhoto", event.currentTarget.files[0]);
                            }
                            }
                        />
                        {(errors.licencePhoto && touched.licencePhoto) && (
                            <div className={"text-danger"}>{errors.licencePhoto}</div>)}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="konzessionPhoto" className="form-label">{t("vehicles:konzession_photo")}</label>
                        <Input
                            type="file"
                            name="konzessionPhoto"
                            id="konzessionPhoto"
                            onChange={(event) => {
                                setFieldValue("konzessionPhoto", event.currentTarget.files[0]);
                            }
                            }
                        />
                        {(errors.konzessionPhoto && touched.konzessionPhoto) && (
                            <div className={"text-danger"}>{errors.konzessionPhoto}</div>)}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="name"
                               className="form-label">{t("common:name")}</label>
                        <input type="text" required className="form-control" id="name" name="name"
                               value={values.name}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.name && touched.name) &&
                            <div className="text-danger">{errors.name}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="company_id" className="form-label">{t("common:company_name")}</label>
                        <Input
                            type="select"
                            name="company_id"
                            id="company_id"
                            value={values.company_id}
                            onChange={() => {
                                setFieldValue("company_id", document.getElementById("company_id").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("vehicles:select_company")}</option>
                            {companies.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.company_name}</option>
                                );
                            })}
                        </Input>
                        {(errors.company_id && touched.company_id) &&
                            <div className="text-danger">{errors.company_id}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="category_id" className="form-label">{t("vehicles:category_name")}</label>
                        <Input
                            type="select"
                            name="category_id"
                            id="category_id"
                            value={values.category_id}
                            onChange={() => {
                                setFieldValue("category_id", document.getElementById("category_id").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("vehicles:select_category")}</option>
                            {vehicleCategories.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.name}</option>
                                );
                            })}
                        </Input>
                        {(errors.category_id && touched.category_id) &&
                            <div className="text-danger">{errors.category_id}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="plate"
                               className="form-label">{t("vehicles:plate")}</label>
                        <input type="text" required className="form-control" id="plate" name="plate"
                               value={values.plate}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.plate && touched.plate) &&
                            <div className="text-danger">{errors.plate}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="brand"
                               className="form-label">{t("vehicles:brand")}</label>
                        <input type="text" required className="form-control" id="brand" name="brand"
                               value={values.brand}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.brand && touched.brand) &&
                            <div className="text-danger">{errors.brand}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="model"
                               className="form-label">{t("vehicles:model")}</label>
                        <input type="text" required className="form-control" id="model" name="model"
                               value={values.model}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.model && touched.model) &&
                            <div className="text-danger">{errors.model}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="color"
                               className="form-label">{t("vehicles:color")}</label>
                        <input type="text" required className="form-control" id="color" name="color"
                               value={values.color}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.color && touched.color) &&
                            <div className="text-danger">{errors.color}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="year"
                               className="form-label">{t("vehicles:year")}</label>
                        <input type="number" required className="form-control" id="year" name="year"
                               value={values.year}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.year && touched.year) &&
                            <div className="text-danger">{errors.year}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="fuel" className="form-label">{t("vehicles:fuel")}</label>
                        <Input
                            type="select"
                            name="fuel"
                            id="fuel"
                            value={values.fuel}
                            onChange={() => {
                                setFieldValue("fuel", document.getElementById("fuel").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("vehicles:select_fuel_type")}</option>
                            {FUEL_TYPES.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{t("vehicles:" + item.label)}</option>
                                    );
                                }
                            )}
                        </Input>
                        {(errors.fuel && touched.fuel) &&
                            <div className="text-danger">{errors.fuel}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="engine"
                               className="form-label">{t("vehicles:engine")}</label>
                        <input type="text" required className="form-control" id="engine" name="engine"
                               value={values.engine}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.engine && touched.engine) &&
                            <div className="text-danger">{errors.engine}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="chassis"
                               className="form-label">{t("vehicles:chassis")}</label>
                        <input type="text" required className="form-control" id="chassis" name="chassis"
                               value={values.chassis}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.chassis && touched.chassis) &&
                            <div className="text-danger">{errors.chassis}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="motor_kw"
                               className="form-label">{t("vehicles:motor_kw")}</label>
                        <input type="number" required className="form-control" id="motor_kw" name="motor_kw"
                               value={values.motor_kw}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.motor_kw && touched.motor_kw) &&
                            <div className="text-danger">{errors.motor_kw}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="motor_ps"
                               className="form-label">{t("vehicles:motor_ps")}</label>
                        <input type="number" required className="form-control" id="motor_ps" name="motor_ps"
                               value={values.motor_ps}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.motor_ps && touched.motor_ps) &&
                            <div className="text-danger">{errors.motor_ps}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="gearbox" className="form-label">{t("vehicles:gearbox")}</label>
                        <Input
                            type="select"
                            name="gearbox"
                            id="gearbox"
                            value={values.gearbox}
                            onChange={() => {
                                setFieldValue("gearbox", document.getElementById("gearbox").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("vehicles:select_gearbox_type")}</option>
                            {GEARBOX_TYPES.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{t("vehicles:" + item.label)}</option>
                                );
                            })}
                        </Input>
                        {(errors.gearbox && touched.gearbox) &&
                            <div className="text-danger">{errors.gearbox}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="km"
                               className="form-label">{t("vehicles:km")}</label>
                        <input type="number" required className="form-control" id="km" name="km"
                               value={values.km}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.km && touched.km) &&
                            <div className="text-danger">{errors.km}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="status" className="form-label">{t("common:status")}</label>
                        <Input
                            type="select"
                            name="status"
                            id="status"
                            value={values.status}
                            onChange={() => {
                                setFieldValue("status", document.getElementById("status").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("common:select_status")}</option>
                            <option value="0">{t("common:inactive")}</option>
                            <option value="1">{t("common:active")}</option>
                        </Input>
                        {(errors.status && touched.status) &&
                            <div className="text-danger">{errors.status}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="finNumber"
                               className="form-label">{t("vehicles:fin_number")}</label>
                        <input type="text" required className="form-control" id="finNumber" name="finNumber"
                               value={values.finNumber}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.finNumber && touched.finNumber) &&
                            <div className="text-danger">{errors.finNumber}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="keyNumber"
                               className="form-label">{t("vehicles:key_number")}</label>
                        <input type="text" required className="form-control" id="keyNumber" name="keyNumber"
                               value={values.keyNumber}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.keyNumber && touched.keyNumber) &&
                            <div className="text-danger">{errors.keyNumber}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="keyNumber2"
                               className="form-label">{t("vehicles:key_number2")}</label>
                        <input type="text" required className="form-control" id="keyNumber" name="keyNumber2"
                               value={values.keyNumber2}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.keyNumber2 && touched.keyNumber2) &&
                            <div className="text-danger">{errors.keyNumber2}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="purchaseDate"
                               className="form-label">{t("vehicles:purchase_date")}</label>
                        <input type="date" required className="form-control" id="purchaseDate" name="purchaseDate"
                               value={values.purchaseDate}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.purchaseDate && touched.purchaseDate) &&
                            <div className="text-danger">{errors.purchaseDate}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="purchasePrice"
                               className="form-label">{t("vehicles:purchase_price")}</label>
                        <input type="number" step={"0.01"} required className="form-control" id="purchasePrice"
                               name="purchasePrice"
                               value={values.purchasePrice}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.purchasePrice && touched.purchasePrice) &&
                            <div className="text-danger">{errors.purchasePrice}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="purchaseKm"
                               className="form-label">{t("vehicles:purchase_km")}</label>
                        <input type="number" required className="form-control" id="purchaseKm" name="purchaseKm"
                               value={values.purchaseKm}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.purchaseKm && touched.purchaseKm) &&
                            <div className="text-danger">{errors.purchaseKm}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="status" className="form-label">{t("vehicles:is_second_hand")}</label>
                        <Input
                            type="select"
                            name="isSecondHand"
                            id="isSecondHand"
                            value={values.isSecondHand}
                            onChange={() => {
                                setFieldValue("isSecondHand", document.getElementById("isSecondHand").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("common:select_status")}</option>
                            <option value="0">{t("common:no")}</option>
                            <option value="1">{t("common:yes")}</option>
                        </Input>
                        {(errors.isSecondHand && touched.isSecondHand) &&
                            <div className="text-danger">{errors.isSecondHand}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="tuvDate"
                               className="form-label">{t("vehicles:tuv_date")}</label>
                        <input type="date" required className="form-control" id="tuvDate" name="tuvDate"
                               value={values.tuvDate}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.tuvDate && touched.tuvDate) &&
                            <div className="text-danger">{errors.tuvDate}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="konzessionDate"
                               className="form-label">{t("vehicles:konzession_date")}</label>
                        <input type="date" required className="form-control" id="konzessionDate" name="konzessionDate"
                               value={values.konzessionDate}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.konzessionDate && touched.konzessionDate) &&
                            <div className="text-danger">{errors.konzessionDate}</div>}
                    </BasicInput>
                    <div className="col-md-12">
                        {submitting ? <button type="button"
                                              className="btn btn-outline-secondary float-end disabled">{t("common:submitting")}</button> :
                            <button onClick={handleSubmit} type="submit"
                                    className="btn btn-primary-gradien float-end">{t("common:save")}</button>}
                    </div>
                </div>
            </form>
        )}
        </Formik>
    );
};

export default VehicleForm;
