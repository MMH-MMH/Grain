import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import "../../App.css";

class Form extends Component {
  state = {
    data: {},
    error: {},
  };

  validate = () => {
    const errors = {};
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    error.details.map((item) => (errors[item.path[0]] = item.message));

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.validate();
    this.setState({ errors: error || {} });
    if (error) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { data, errors } = this.state;
    const error = this.validateProperty(input);
    if (error) {
      errors[input.name] = error;
    } else delete errors[input.name];
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
      />
    );
  }
}

export default Form;
