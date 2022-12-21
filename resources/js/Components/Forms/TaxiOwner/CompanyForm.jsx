import {API_URL, APP_DOMAIN} from "@/Constant/GlobalConstants";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Input} from "reactstrap";
import BasicInput from "@/CommonElements/Input/BasicInput";
import SubmitCompanyData from "@/Hooks/SubmitForms/TaxiOwner/Company/SubmitCompanyData";
import getCountryList from "@/Hooks/Tools/Location/getCountryList";

const CompanyForm = ({formType, company = {}, token}) => {
    const {submitData, submitting, isCompleted} = SubmitCompanyData(token, false);
    const {t} = useTranslation([
        "taxi_owner_company",
        "common",
        "errors"
    ]);
    const navigate = useNavigate();
    let stateList = [];
    let cityList = [];
    const {countries} = getCountryList();
    const [state, setState] = useState([{value: 0, label: t("taxi_owner_company:select_state")}]);
    const [city, setCity] = useState([{value: 0, label: t("taxi_owner_company:select_city")}]);

    async function getStateList(countryId) {
        const response = await axios.post(API_URL + 'states', {country_id: countryId}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return response.data;
    }
    async function getCityList(stateId) {
        const response = await axios.post(API_URL + 'cities', {state_id: stateId}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return response.data;
    }
    const countryOnchangeHandler = (country_id) => {
        const countryId = country_id;
        getStateList(countryId).then(data => {
            // check if data is empty
            if (data.length !== 0) {
                data.map((item) => {
                    stateList.push({
                        value: item.id,
                        label: item.name
                    });
                });
                // sort state list by name
                stateList.sort((a, b) => (a.label > b.label) ? 1 : -1);
                setState(stateList);
                // get city list of first state
                getCityList(stateList[0].value).then(data => {
                    // check if data is empty
                    if (data.length !== 0) {
                        data.map((item) => {
                            cityList.push({
                                value: item.id,
                                label: item.name
                            });
                        });
                        // sort city list by name
                        cityList.sort((a, b) => (a.label > b.label) ? 1 : -1);
                        setCity(cityList);
                    } else {
                        setCity([{value: 0, label: t("taxi_owner_company:select_city")}]);
                    }
                });
            } else {
                setState([{value: 0, label: t("taxi_owner_company:no_state_found")}]);
                setCity([{value: 0, label: t("taxi_owner_company:no_city_found")}]);
            }
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            });
        });
    }
    const stateOnchangeHandler = (state_id) => {
        const stateId = state_id;
        getCityList(stateId).then(data => {
            // check if data is empty
            if (data.length !== 0) {
                data.map((item) => {
                    cityList.push({
                        value: item.id,
                        label: item.name
                    });
                });
                // sort city list by name
                cityList.sort((a, b) => (a.label > b.label) ? 1 : -1);
                setCity(cityList);
            } else {
                setCity([{value: 0, label: t("taxi_owner_company:no_city_found")}]);
            }
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            });
        });
    }
    // Call the async function and set the state
    useEffect(() => {
        countryOnchangeHandler(formType ? company.country_id : 82);
        stateOnchangeHandler(formType ? company.state_id : 3010);
    }, [navigate]);


    function handleSubmit(values) {
        submitData(values);
        if (isCompleted === "success") {
            if (formType) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: t("taxi_owner_company:taxi_company_created"),
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: t("taxi_owner_company:you_updated_company"),
                });
            }
            navigate('/taxi-companies', {replace: true});
        } else if (isCompleted === "error") {
            if (formType) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: t("taxi_owner_company:taxi_company_update_error"),
                });
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: t("taxi_owner_company:taxi_company_create_error"),
                });
            }
        }
    }

    return (
        <Formik
            initialValues={{
                "id": formType ? company.id : "",
                "slug": formType ? (company.slug ? company.slug : "") : "",
                "primary_image": "",
                "logo": "",
                "company_name": formType ? (company.company_name ? company.company_name : "") : "",
                "name": formType ? (company.name ? company.name : "") : "",
                "surname": formType ? (company.surname ? company.surname : "") : "",
                "email": formType ? (company.email ? company.email : "") : "",
                "phone": formType ? (company.phone ? company.phone : "") : "",
                "gsm": formType ? (company.gsm ? company.gsm : "") : "",
                "country": formType ? (company.country ? company.country : 82) : 82,
                "address_region": formType ? (company.address_region ? company.address_region : 3010) : 3010,
                "address_locality": formType ? (company.address_locality ? company.address_locality : 0) : 0,
                "postal_code": formType ? (company.postal_code ? company.postal_code : "") : "",
                "street_address": formType ? (company.street_address ? company.street_address : "") : "",
                "latitude": formType ? (company.latitude ? company.latitude : "") : "",
                "longitude": formType ? (company.longitude ? company.longitude : "") : "",
                "price_range": formType ? (company.price_range ? company.price_range : "") : "",
                "tax_no": formType ? (company.tax_no ? company.tax_no : "") : "",
                "tax_no2": formType ? (company.tax_no2 ? company.tax_no2 : "") : "",
                "website": formType ? (company.website ? company.website : "") : "",
                "title": formType ? (company.title ? company.title : "") : "",
                "description": formType ? (company.description ? company.description : "") : "",
            }}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={
                Yup.object().shape({
                    id: Yup.string(),
                    slug: Yup.string().required(t("errors:this_field_is_required")),
                    primary_image: Yup.mixed(),
                    logo: Yup.mixed(),
                    company_name: Yup.string().required(t("errors:this_field_is_required")),
                    name: Yup.string().required(t("errors:this_field_is_required")),
                    surname: Yup.string().required(t("errors:this_field_is_required")),
                    email: Yup.string().required(t("errors:this_field_is_required")),
                    phone: Yup.string(),
                    gsm: Yup.string(),
                    country: Yup.string().required(t("errors:this_field_is_required")),
                    address_region: Yup.string(),
                    address_locality: Yup.string(),
                    postal_code: Yup.string(),
                    street_address: Yup.string(),
                    latitude: Yup.string(),
                    longitude: Yup.string(),
                    price_range: Yup.string(),
                    tax_no: Yup.string(),
                    tax_no2: Yup.string(),
                    website: Yup.string(),
                    title: Yup.string(),
                    description: Yup.string(),
                })
            }
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
                    {formType ? <>
                        <div className="col-md-3">
                            <img src={company.logo} alt="logo" className="img-fluid" style={{width: "100%"}}/>
                        </div>
                        <div className="col-md-3">
                            <img src={company.primary_image} alt="primary_image" className="img-fluid"
                                 style={{width: "100%"}}/>
                        </div>
                    </> : <></>}
                    <BasicInput>
                        <label htmlFor="logo" className="form-label">Logo</label>
                        <Input
                            type="file"
                            name="logo"
                            id="logo"
                            onChange={(event) => {
                                setFieldValue("logo", event.currentTarget.files[0]);
                            }
                            }
                        />
                        {(errors.logo && touched.logo) && (<div className={"text-danger"}>{errors.logo}</div>)}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="primary_image"
                               className="form-label">{t("taxi_owner_company:primary_image")}</label>
                        <Input
                            type="file"
                            name="primary_image"
                            id="primary_image"
                            onChange={(event) => {
                                setFieldValue("primary_image", event.currentTarget.files[0]);
                            }
                            }
                        />
                        {(errors.primary_image && touched.primary_image) && (
                            <div className={"text-danger"}>{errors.primary_image}</div>)}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="slug" className="form-label">{t("taxi_owner_company:slug")}</label>
                        <input type="text" required className="form-control" id="slug" name="slug" value={values.slug}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.slug && touched.slug) && <div className="text-danger">{errors.slug}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="company_name"
                               className="form-label">{t("taxi_owner_company:company_name")}</label>
                        <input type="text" required className="form-control" id="company_name" name="company_name"
                               value={values.company_name}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.company_name && touched.company_name) &&
                            <div className="text-danger">{errors.company_name}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="title" className="form-label">{t("taxi_owner_company:title")}</label>
                        <input type="text" required className="form-control" id="title" name="title"
                               value={values.title}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.title && touched.title) && <div className="text-danger">{errors.title}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="name" className="form-label">{t("taxi_owner_company:name")}</label>
                        <input type="text" required className="form-control" id="name" name="name" value={values.name}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.name && touched.name) && <div className="text-danger">{errors.name}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="surname" className="form-label">{t("taxi_owner_company:surname")}</label>
                        <input type="text" required className="form-control" id="surname" name="surname"
                               value={values.surname}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.surname && touched.surname) && <div className="text-danger">{errors.surname}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="website" className="form-label">{t("taxi_owner_company:website")}</label>
                        <input type="text" required className="form-control" id="website" name="website"
                               value={values.website}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.website && touched.website) && <div className="text-danger">{errors.website}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="email" className="form-label">{t("taxi_owner_company:email")}</label>
                        <input type="email" required className="form-control" id="email" name="email"
                               value={values.email}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.email && touched.email) && <div className="text-danger">{errors.email}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="phone" className="form-label">{t("taxi_owner_company:phone")}</label>
                        <input type="tel" required className="form-control" id="phone" name="phone" value={values.phone}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.phone && touched.phone) && <div className="text-danger">{errors.phone}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="gsm" className="form-label">GSM</label>
                        <input type="tel" required className="form-control" id="gsm" name="gsm" value={values.gsm}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.gsm && touched.gsm) && <div className="text-danger">{errors.gsm}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="country" className="form-label">{t("taxi_owner_company:select_country")}</label>
                        <Input
                            type="select"
                            name="country"
                            id="country"
                            value={values.country}
                            onChange={() => {
                                setFieldValue("country", document.getElementById("country").value)
                                countryOnchangeHandler(document.getElementById("country").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("taxi_owner_company:select_country")}</option>
                            {countries.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                );
                            })}
                        </Input>
                        {(errors.availability && touched.availability) &&
                            <div className="text-danger">{errors.availability}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="address_region"
                               className="form-label">{t("taxi_owner_company:select_state")}</label>
                        <Input
                            type="select"
                            name="address_region"
                            id="address_region"
                            value={values.address_region}
                            onChange={() => {
                                setFieldValue("address_region", document.getElementById("address_region").value)
                                stateOnchangeHandler(document.getElementById("address_region").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("taxi_owner_company:select_state")}</option>
                            {state.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                );
                            })}
                        </Input>
                        {(errors.address_region && touched.address_region) &&
                            <div className="text-danger">{errors.address_region}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="address_locality"
                               className="form-label">{t("taxi_owner_company:select_city")}</label>
                        <Input
                            type="select"
                            name="address_locality"
                            id="address_locality"
                            value={values.address_locality}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("taxi_owner_company:select_city")}</option>
                            {city.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                );
                            })}
                        </Input>
                        {(errors.address_locality && touched.address_locality) &&
                            <div className="text-danger">{errors.address_locality}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="postal_code"
                               className="form-label">{t("taxi_owner_company:postal_code")}</label>
                        <input type="text" required className="form-control" id="postal_code" name="postal_code"
                               value={values.postal_code}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.postal_code && touched.postal_code) &&
                            <div className="text-danger">{errors.postal_code}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="latitude" className="form-label">{t("taxi_owner_company:latitude")}</label>
                        <input type="text" required className="form-control" id="latitude" name="latitude"
                               value={values.latitude}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.latitude && touched.latitude) && <div className="text-danger">{errors.latitude}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="longitude" className="form-label">{t("taxi_owner_company:longitude")}</label>
                        <input type="text" required className="form-control" id="longitude" name="longitude"
                               value={values.longitude}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.longitude && touched.longitude) &&
                            <div className="text-danger">{errors.longitude}</div>}
                    </BasicInput>
                    <BasicInput layout={"col-md-6"}>
                        <label htmlFor="street_address"
                               className="form-label">{t("taxi_owner_company:street_address")}</label>
                        <input type="text" required className="form-control" id="street_address" name="street_address"
                               value={values.street_address}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.street_address && touched.street_address) &&
                            <div className="text-danger">{errors.street_address}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="price_range"
                               className="form-label">{t("taxi_owner_company:price_range")}</label>
                        <Input
                            type="select"
                            name="price_range"
                            id="price_range"
                            value={values.price_range}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        >
                            <option key={1} value={"$"}>$</option>
                            <option key={2} value={"$$"}>$$</option>
                            <option key={3} value={"$$$"}>$$$</option>
                            <option key={4} value={"$$$$"}>$$$$</option>
                            <option key={5} value={"$$$$$"}>$$$$$</option>
                        </Input>
                        {(errors.price_range && touched.price_range) &&
                            <div className="text-danger">{errors.price_range}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="tax_no" className="form-label">{t("taxi_owner_company:tax_no")}</label>
                        <input type="text" required className="form-control" id="tax_no" name="tax_no"
                               value={values.tax_no}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.tax_no && touched.tax_no) && <div className="text-danger">{errors.tax_no}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="tax_no2" className="form-label">{t("taxi_owner_company:tax_no2")}</label>
                        <input type="text" required className="form-control" id="tax_no2" name="tax_no2"
                               value={values.tax_no2}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.tax_no2 && touched.tax_no2) && <div className="text-danger">{errors.tax_no2}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="is_active" className="form-label">{t("taxi_owner_company:is_active")}</label>
                        <Input
                            type="select"
                            name="is_active"
                            id="is_active"
                            value={values.is_active}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        >
                            <option key={1} value={1}>{t("common:yes")}</option>
                            <option key={2} value={0}>{t("common:no")}</option>
                        </Input>
                        {(errors.is_active && touched.is_active) &&
                            <div className="text-danger">{errors.is_active}</div>}
                    </BasicInput>
                    <BasicInput layout={"col-md-6"}>
                        <label htmlFor="description"
                               className="form-label">{t("taxi_owner_company:description")}</label>
                        <textarea className="form-control" id="description" name="description"
                                  value={values.description}
                                  onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.description && touched.description) &&
                            <div className="text-danger">{errors.description}</div>}
                    </BasicInput>
                    <div className="col-md-12">
                        {submitting ? <button type="button"
                                              className="btn btn-primary-gradien float-end disabled">{t("common:save")}</button> : <button onClick={handleSubmit} type="button"
                                                                                                                                  className="btn btn-primary-gradien float-end">{t("common:save")}</button>}
                    </div>
                </div>
            </form>
        )}
        </Formik>
    );
};

export default CompanyForm;
