const BasicInput = ({  layout = "col-md-3", children}) => {
    return (
        <div className={layout}>
            <div className="form-group">
                {children}
            </div>
        </div>
    );
};

export default BasicInput
