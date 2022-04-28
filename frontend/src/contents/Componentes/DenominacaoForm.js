import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { FormGroup, Form as BSForm, Button } from "react-bootstrap";
import Select from "react-select";

class DenominaçãoForm extends React.Component {
  state = {
    denominações: [],
  };
  componentDidMount() {
    var config = {
      headers: { Authorization: "Bearer " + this.props.usuario.token },
    };
    axios
      .get("http://localhost:8080/denominacao/options", config)
      .then((response) => {
        this.setState(() => ({ denominações: response.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            DenominacaoId: this.props.values?.DenominacaoId,
            denominacao: this.props.values?.denominacao,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.DenominacaoId) {
              errors.DenominacaoId = "Campo obrigatório";
            }
            if (!values.denominacao) {
              errors.denominacao = "Campo obrigatório";
            }
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.save(values, () => setSubmitting(false));
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => {
            return (
              <>
                <Form>
                  <FormGroup>
                    <BSForm.Label>Denominação Pai</BSForm.Label>
                    <ErrorMessage
                      name="denominacaoId"
                      component="span"
                      className="text-danger small ml-2"
                    />
                    <Select
                      noOptionsMessage={() => "Nada encontrado."}
                      placeholder="Pesquisar..."
                      options={this.state.denominações}
                      value={this.state.denominações.find(
                        (option) => option.value === values.DenominacaoId
                      )}
                      onChange={(option) =>
                        setFieldValue("DenominacaoId", option?.value)
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <BSForm.Label>Denominacao</BSForm.Label>
                    <ErrorMessage
                      name="denominacao"
                      component="span"
                      className="text-danger small ml-2"
                    />
                    <Field
                      type="text"
                      name="denominacao"
                      className="form-control"
                      value={values.denominacao}
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
