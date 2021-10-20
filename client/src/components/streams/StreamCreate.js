import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput({ input }) {
    /* return (
      <input
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      /> 
    ); */
    // return <input {...formProps.input} />;
    return <input {...input} />;
  }

  render() {
    return (
      <form action="#">
        <Field name="title" component={this.renderInput} />
        <Field name="description" component={this.renderInput} />
      </form>
    );
  }
}

export default reduxForm({
  form: "streamCreate",
})(StreamCreate);
