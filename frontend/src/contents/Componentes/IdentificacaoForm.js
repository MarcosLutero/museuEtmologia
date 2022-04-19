import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";

class IdentificacaoList extends React.Component {
  render() {
    return (
      <Formik initialValues={{}} validate={(values) => {}} onSubmit={(values, { setSubmitting }) => {
        this.save(values, () => setSubmitting(false));
      }}>

      </Formik>
    );
  }
}

export default IdentificacaoList;
