import SubmitSubscriptionData from "../../../../Hooks/Data/Admin/Subscriptions/SubmitSubscriptionData";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Input} from "reactstrap";
import {Formik} from "formik";
import Swal from "sweetalert2";
import BasicInput from "@/CommonElements/Input/BasicInput";

export default function SubscriptionsForm({formType, token, subscription}) {
    const {submitData, submitting, isCompleted} = SubmitSubscriptionData(token, formType);
    const navigate = useNavigate();

    const {t} = useTranslation([
        "super_admin_subscription_packages",
        "errors",
        "common"
    ]);
    const statusOpt = [
        {value: 1, label: t("common:active")},
        {value: 0, label: t("common:inactive")},
    ];

    const yesnoOpt = [
        {value: 1, label: t("common:yes")},
        {value: 0, label: t("common:no")},
    ];

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
        navigate('/subscription-packages', {replace: true});
    }

    return (
        <Formik
            initialValues={{
                "id": formType ? "" : subscription.id,
                "name": formType ? "" : subscription.name,
                "description": formType ? "" : subscription.description,
                "is_email_enabled": formType ? "" : subscription.is_email_enabled,
                "is_chat_box_enabled": formType ? "" : subscription.is_chat_box_enabled,
                "is_data_edit_enabled": formType ? "" : subscription.is_data_edit_enabled,
                "is_assistant_enabled": formType ? "" : subscription.is_assistant_enabled,
                "can_request_quote": formType ? "" : subscription.can_request_quote,
                "can_manage_order": formType ? "" : subscription.can_manage_order,
                "can_print_order": formType ? "" : subscription.can_print_order,
                "can_print_invoice": formType ? "" : subscription.can_print_invoice,
                "can_see_statistics": formType ? "" : subscription.can_see_statistics,
                "is_employee_module_enabled": formType ? "" : subscription.is_employee_module_enabled,
                "is_partner_firm_enabled": formType ? "" : subscription.is_partner_firm_enabled,
                "can_manage_partner_firm_employees": formType ? "" : subscription.can_manage_partner_firm_employees,
                "is_customer_statistics_enabled": formType ? "" : subscription.is_customer_statistics_enabled,
                "is_vehicle_module_enabled": formType ? "" : subscription.is_vehicle_module_enabled,
                "price": formType ? "" : subscription.price,
                "max_company_number": formType ? "" : subscription.max_company_number,
                "can_add_partner_firm": formType ? "" : subscription.can_add_partner_firm,
                "start_date": formType ? "" : subscription.start_date,
                "end_date": formType ? "" : subscription.end_date,
                "status": formType ? "" : subscription.status,
            }}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={
                Yup.object().shape({
                    id: Yup.string(),
                    name: Yup.string().required(t("errors:this_field_is_required")),
                    description: Yup.string(),
                    price: Yup.string().required(t("errors:this_field_is_required")),
                    max_company_number: Yup.string().required(t("errors:this_field_is_required")),
                    can_add_partner_firm: Yup.string().required(t("errors:this_field_is_required")),
                    start_date: Yup.string(),
                    end_date: Yup.string(),
                    status: Yup.string().required(t("errors:this_field_is_required")),
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
                    <BasicInput>
                        <label htmlFor="name"
                               className="form-label">{t("super_admin_subscription_packages:name")}</label>
                        <input type="text" required className="form-control" id="name" name="name" value={values.name}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.name && touched.name) && <div className="text-danger">{errors.name}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="description"
                               className="form-label">{t("super_admin_subscription_packages:description")}</label>
                        <input type="text" required className="form-control" id="description" name="description"
                               value={values.description}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.description && touched.description) &&
                            <div className="text-danger">{errors.description}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="price"
                               className="form-label">{t("super_admin_subscription_packages:price")}</label>
                        <input type="number" required className="form-control" id="price" name="price"
                               value={values.price}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.price && touched.price) && <div className="text-danger">{errors.price}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="max_company_number"
                               className="form-label">{t("super_admin_subscription_packages:max_company_number")}</label>
                        <input type="text" required className="form-control" id="max_company_number"
                               name="max_company_number" value={values.max_company_number}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.max_company_number && touched.max_company_number) &&
                            <div className="text-danger">{errors.max_company_number}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="can_add_partner_firm"
                               className="form-label">{t("super_admin_subscription_packages:can_add_partner_firm")}</label>
                        <Input
                            type="select"
                            name="can_add_partner_firm"
                            id="can_add_partner_firm"
                            value={values.can_add_partner_firm}
                            onChange={() => {
                                setFieldValue("can_add_partner_firm", document.getElementById("can_add_partner_firm").value)
                            }}
                            onBlur={handleBlur}
                            required
                        >
                            <option value="">{t("common:select_an_option")}</option>
                            {yesnoOpt.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                );
                            })}
                        </Input>
                        {(errors.can_add_partner_firm && touched.can_add_partner_firm) &&
                            <div className="text-danger">{errors.can_add_partner_firm}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="start_date"
                               className="form-label">{t("super_admin_subscription_packages:start_date")}</label>
                        <input type="date" required className="form-control" id="start_date" name="start_date"
                               value={values.start_date}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.start_date && touched.start_date) &&
                            <div className="text-danger">{errors.start_date}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="end_date"
                               className="form-label">{t("super_admin_subscription_packages:end_date")}</label>
                        <input type="date" required className="form-control" id="end_date" name="end_date"
                               value={values.end_date}
                               onChange={handleChange} onBlur={handleBlur}/>
                        {(errors.end_date && touched.end_date) && <div className="text-danger">{errors.end_date}</div>}
                    </BasicInput>
                    <BasicInput>
                        <label htmlFor="status"
                               className="form-label">{t("super_admin_subscription_packages:status")}</label>
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
                            <option value="">{t("common:select_an_option")}</option>
                            {statusOpt.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                );
                            })}
                        </Input>
                        {(errors.status && touched.status) &&
                            <div className="text-danger">{errors.status}</div>}
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
