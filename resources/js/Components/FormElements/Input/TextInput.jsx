import React from 'react';
import {Input} from "reactstrap";
import classes from "./TextInput.module.css";

const TextInput = ({name, label, placeholder = "", layout, onChange, onBlur, type, error}) => {
    return (
        <div className={layout}>
            <label htmlFor={name} className={classes.label}>{label}</label>
            <Input
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                className={classes.input}
            />
            {error && <div className={classes.errorText}>{error}</div>}
        </div>
    );
};

export default TextInput;
