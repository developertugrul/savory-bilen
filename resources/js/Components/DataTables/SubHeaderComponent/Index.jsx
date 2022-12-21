import React from 'react';
import {useTranslation} from "react-i18next";
const SubHeaderComponent = (props) => {
    const { t } = useTranslation([
        "common"
    ]);
    return (
        <div style={{ display:'flex'}}>
            <button className={props.action.class} onClick={props.action.uri}>
                {props.action.title}
            </button>
            <input placeholder={t("common:search")} onChange={props.filter} style={{ flex:1}} type="text"
                   className="ml-1 form-control" />
        </div>
    )
};
export default SubHeaderComponent;
