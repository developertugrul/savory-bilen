const BasicSelect = ({input, meta, name, id, label, className = "form-control", layout = "col-md-6", data = []}) => {
    return (
        <div className={layout}>
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <select {...input} className={className} id={id} name={name}>
                    {data.map((item, index) => {
                        return (
                            <option key={index} value={item.value}>{item.label}</option>
                        );
                    })}
                </select>
                {meta.touch && meta.error && <span className="text-danger">{meta.message}</span>}
            </div>
        </div>
    );
};

export default BasicSelect
