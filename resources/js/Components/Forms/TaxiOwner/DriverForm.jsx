import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Input} from "reactstrap";
import BasicInput from "@/CommonElements/Input/BasicInput";
import SubmitDriverData from "../../../Hooks/SubmitForms/TaxiOwner/Driver/SubmitDriverData";
import {API_URL} from "@/Constant/GlobalConstants";

const DriverForm = ({formType, driver = {}, token}) => {
    const {submitData, submitting, isCompleted} = SubmitDriverData(token, formType);
    const [companies, setCompanies] = useState([]);
    const {t} = useTranslation([
        "taxi_owner_drivers",
        "common",
        "errors"
    ]);
    const navigate = useNavigate();

    const fetchCompanies = () => {
        axios.get(API_URL + 'companies', {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json"
            }
        }).then(response => {
            setCompanies(response.data);
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: t("errors:failed"),
                text: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
        });
    }
    useEffect(() => {
        fetchCompanies();
    }, []);

    function handleSubmit(values) {
        submitData(values);
        if (isCompleted === "success") {
            formType ? navigate(-1) : navigate('/taxi-owner/drivers');
        }
    }

    return (
        <Formik
            initialValues={{
                "id": formType ? driver.id : "",
                "avatar": "",
                "name": formType ? driver.name : "",
                "surname": formType ? driver.surname : "",
                "username": formType ? driver.username : "",
                "email": formType ? driver.email : "",
                "password": formType ? driver.password : "",
                "password_confirmation": formType ? driver.password_confirmation : "",
                "company_id": formType ? driver.company_id : "",
                "phone": formType ? driver.phone : "",
                "gsm": formType ? driver.gsm : "",
                "gender": formType ? driver.gender : "",
                "biography": formType ? (driver.biography != null ? driver.biography : "") : "",
            }}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={
                Yup.object().shape({
                    id: formType ? Yup.number().required(t("errors:required")) : Yup.number(),
                    avatar: Yup.mixed(),
                    name: Yup.string().required(t("errors:required")),
                    surname: Yup.string().required(t("errors:required")),
                    username: Yup.string().required(t("errors:required")),
                    email: Yup.string().email(t("errors:email")).required(t("errors:required")),
                    password: formType ? Yup.string() : Yup.string().required(t("errors:required")),
                    password_confirmation: formType ? Yup.string() : Yup.string().required(t("errors:required")),
                    company_id: Yup.string().required(t("errors:required")),
                    phone: Yup.string(),
                    gsm: Yup.string().required(t("errors:required")),
                    gender: Yup.string().required(t("errors:required")),
                    biography: Yup.string(),
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
                            <img src={"/images/taxi-company/driver/"+driver.avatar} alt="avatar" className="img-fluid" style={{width: "100%"}}/>
                        </div>
                    </> : <></>}
                    <BasicInput>
                        <label htmlFor="avatar" className="form-label">Avatar</label>
                        <Input
                            type="file"
                            name="avatar"
                            id="avatar"
                            onChange={(event) => {
                                setFieldValue("avatar", event.currentTarget.files[0]);
                            }
                            }
                        />
                        {(errors.avatar && touched.avatar) && (<div className={"text-danger"}>{errors.avatar}</div>)}
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
                        <label htmlFor="surname" className="form-label">{t("common:surname")}</label>
                        <input type="text" required className="form-control" id="surname" name="surname"
                               value={values.surname}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.surname && touched.surname) && <div className="text-danger">{errors.surname}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="username" className="form-label">{t("common:username")}</label>
                        <input type="text" required className="form-control" id="username" name="username" autoComplete={"off"}
                               value={values.username}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.username && touched.username) && <div className="text-danger">{errors.username}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="email" className="form-label">{t("common:email")}</label>
                        <input type="email" required className="form-control" id="email" name="email"
                               value={values.email}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.surname && touched.email) && <div className="text-danger">{errors.email}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="password" className="form-label">{t("common:password")}</label>
                        <input type="password" required className="form-control" id="password" name="password" autoComplete={"off"}
                               value={values.password}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.password && touched.password) && <div className="text-danger">{errors.password}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="password_confirmation"
                               className="form-label">{t("common:password_confirmation")}</label>
                        <input type="password" required className="form-control" id="password_confirmation" autoComplete={"off"}
                               name="password_confirmation"
                               value={values.password_confirmation}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.password_confirmation && touched.password_confirmation) &&
                            <div className="text-danger">{errors.password_confirmation}</div>}
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
                            <option value="">{t("taxi_owner_company:select_company")}</option>
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
                        <label htmlFor="gsm" className="form-label">GSM</label>
                        <input type="tel" required className="form-control" id="gsm" name="gsm" value={values.gsm}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.gsm && touched.gsm) && <div className="text-danger">{errors.gsm}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="phone"
                               className="form-label">{t("common:phone")}</label>
                        <input type="text" required className="form-control" id="phone" name="phone"
                               value={values.phone}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.phone && touched.phone) &&
                            <div className="text-danger">{errors.phone}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="gender"
                               className="form-label">{t("common:is_active")}</label>
                        <Input
                            type="select"
                            name="gender"
                            id="gender"
                            value={values.gender}
                            onChange={() => {
                                setFieldValue("gender", document.getElementById("gender").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("common:select_gender")}</option>
                            <option value="1">{t("common:male")}</option>
                            <option value="0">{t("common:female")}</option>
                        </Input>
                        {(errors.gender && touched.gender) &&
                            <div className="text-danger">{errors.gender}</div>}
                    </BasicInput>
                    <BasicInput layout={"col-md-6"}>
                        <label htmlFor="biography"
                               className="form-label">{t("taxi_owner_company:biography")}</label>
                        <textarea className="form-control" id="biography" name="biography"
                                  value={values.biography}
                                  onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.biography && touched.biography) &&
                            <div className="text-danger">{errors.biography}</div>}
                    </BasicInput>
                    <div className="col-md-12">
                        {submitting ? <button type="button"
                                              className="btn btn-primary-gradien float-end disabled">{t("common:save")}</button> :
                            <button onClick={handleSubmit} type="button"
                                    className="btn btn-primary-gradien float-end">{t("common:save")}</button>}
                    </div>
                </div>
            </form>
        )}
        </Formik>
    );
};

export default DriverForm;
