import React from "react";
// import { MDBInput } from "mdbreact";
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id={name}>
            {label}
          </span>
        </div>

        <input
          className="form-control"
          {...rest}
          name={name}
          placeholder={label}
          aria-label={label}
          aria-describedby={name}
        ></input>
      </div>
      {error && <div className="alert alert-danger ">{error}</div>}
    </div>
  );
};

export default Input;
