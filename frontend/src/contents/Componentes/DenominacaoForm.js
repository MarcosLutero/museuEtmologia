import { faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {
  FormGroup,
  Form as BSForm,
  Button,
} from "react-bootstrap";
import "./css/index.scss";

class DenominaçãoForm extends React.Component {
  static defaultProps = {
    values: {},
  };

  save(values, callback) {
    const method = this.props.values.id ? "put" : "post";
    const url =
      "http://localhost:8080/denominacao" +
      (this.props.values.id ? "/" + this.props.values.id : "");
    axios({
      method: method,
      url: url,
      data: values,
      headers: { Authorization: "Bearer " + this.props.usuario.token },
    })
      .then(() => {
        this.props.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finnaly(() => callback());
  }

  render() {
    return (
      <>
        <Formik
          initialValues={{
            ...this.props.values,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.nome) errors.nome = "Campo obrigatório";
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.save(values, () => setSubmitting(false));
          }}
        >
          {({ isSubmitting, values}) => {
            return (
              <>
                <Form>      
                      <FormGroup>
                        <BSForm.Label>Nome</BSForm.Label>
                        <ErrorMessage
                          name="nome"
                          component="span"
                          className="text-danger small ml-2"
                        />
                        <Field
                          type="text"
                          name="nome"
                          className="form-control"
                          value={values.nome}
                        />
                      </FormGroup>
                  <FormGroup>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      className="mt-2"
                    >
                      <FontAwesomeIcon icon={faSave} />
                      &nbsp; Gravar Alterações
                    </Button>
                  </FormGroup>
                </Form>
              </>
            );
          }}
        </Formik>
      </>
    );
  }
}

export default DenominaçãoForm;
