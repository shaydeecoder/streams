import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    /* return (
      <input
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      /> 
    ); */
    // return <input {...formProps.input} />;

    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label htmlFor={input.name}>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    // console.log(formValues);
    // console.log(this.props);
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        action="#"
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title: "
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description: "
        />

        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
