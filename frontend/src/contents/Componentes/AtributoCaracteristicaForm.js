import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import React from "react";
import {
  FormGroup,
  Form as BSForm,
  Button,
  Tabs,
  Tab,
  Table,
} from "react-bootstrap";
import Select from "react-select";
import * as Icons from "@fortawesome/free-solid-svg-icons";
class AtributoCaracteristicaForm extends React.Component {
  static defaultProps = {
    values: {},
  };

  state = {
    filter: "",
    result: "",
  };

  save(values, callback) {
    const method = this.props.values.id ? "put" : "post";
    const url =
      "http://localhost:8080/atributoCaracteristica" +
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
    var valores = [
      { value: "Descrição Morfológica", label: "Descrição Morfológica" },
      { value: "Descrição Biológica", label: "Descrição Biológica" },
      { value: "Descrição Ecológica", label: "Descrição Ecológica" },
    ];

    return (
      <Formik
        initialValues={{
          ...this.props.values,
          Caracteristicas:
            this.props.values.Caracteristicas?.sort((a, b) =>
              a.nome.localeCompare(b.nome)
            ) ?? [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.nome) errors.nome = "Campo obrigatório";
          if (!values.identificacao) errors.identificacao = "Campo obrigatório";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.save(values, () => setSubmitting(false));
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <>
              <Form>
                <Tabs defaultActiveKey="atributos">
                  <Tab eventKey="atributos" title="Atributos">
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
                      <BSForm.Label>Identificação</BSForm.Label>
                      <ErrorMessage
                        name="identificacao"
                        component="span"
                        className="text-danger small ml-2"
                      />
                      <Select
                        noOptionsMessage={() => "Nada encontrado."}
                        placeholder="Pesquisar..."
                        options={valores}
                        value={valores.find(
                          (option) => option.value === values.identificacao
                        )}
                        onChange={(option) => {
                          setFieldValue("identificacao", option?.value);
                          clearTimeout(this.timeout);
                        }}
                      />
                    </FormGroup>
                  </Tab>
                  <Tab eventKey="detalhes" title="Detalhes">
                    <legend>Caracteristicas Cadastradas</legend>
                    <div className="divstyle">
                      <Table striped>
                        <tbody>
                          {values.Caracteristicas.map((caracteristica, key) => (
                            <tr key={key}>
                              <td>
                                Nome:
                                <Field
                                  className="form-control"
                                  name={`Caracteristicas[${key}].nome`}
                                />
                                Descrição:
                                <Field
                                  className="form-control"
                                  name={`Caracteristicas[${key}].descricao`}
                                  as="textarea"
                                />
                              </td>
                              <td>
                                <Button
                                  className="form-control"
                                  variant="danger"
                                  size="sm"
                                  onClick={() =>
                                    setFieldValue(
                                      "Caracteristicas",
                                      values.Caracteristicas.filter(
                                        (c) => c !== caracteristica
                                      )
                                    )
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <Button
                      className="form-control"
                      variant="success"
                      onClick={() =>
                        setFieldValue("Caracteristicas", [
                          ...values.Caracteristicas,
                          {
                            id: this.props.values.id ? null : undefined,
                            nome: "",
                            descricao: "",
                          },
                        ])
                      }
                    >
                      Adicionar
                    </Button>
                  </Tab>
                </Tabs>
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
    );
  }
}

export default AtributoCaracteristicaForm;
