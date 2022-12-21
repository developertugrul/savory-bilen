import {Input} from "reactstrap";

const FileInput = ({input, meta, type, id, label, onChange, name, className = "form-control", layout = "col-md-6"}) => {
  return (

      <div className={layout}>
          <div className="form-group">
              <label htmlFor={id}>{label}</label>
              <Input {...input} type={type} onChange={onChange} className={className} id={id} name={name}/>
              {meta.touch && meta.error && <span className="text-danger">{meta.message}</span>}
          </div>
      </div>
  )
}

export default FileInput
