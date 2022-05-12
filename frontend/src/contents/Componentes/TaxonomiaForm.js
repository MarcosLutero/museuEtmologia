import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {
  FormGroup,
  Form as BSForm,
  Button,
  Tab,
  Tabs,
  Table,
} from "react-bootstrap";
import Select from "react-select";

class TaxonomiaForm extends React.Component {
  state = {
    taxonomias: [],
    denominacaos: [],
    atributos: [],
    loaded: false,
  };

  componentDidMount() {
    var config = {
      headers: { Authorization: "Bearer " + this.props.usuario.token },
    };

    Promise.all([
      new Promise((resolve, reject) =>
        axios
          .get("http://localhost:8080/taxonomia/options", config)
          .then((response) => {
            this.setState(() => ({ taxonomias: response.data }), resolve());
          })
          .catch((err) => {
            reject(err);
          })
      ),
      new Promise((resolve, reject) =>
        axios
          .get("http://localhost:8080/denominacao/options", config)
          .then((response) => {
            this.setState(() => ({ denominacaos: response.data }), resolve());
          })
          .catch((err) => {
            reject(err);
          })
      ),
      new Promise((resolve, reject) =>
        axios
          .get("http://localhost:8080/atributoCaracteristica/options", config)
          .then((response) => {
            this.setState(() => ({ atributos: response.data }), resolve());
          })
          .catch((err) => {
            reject(err);
          })
      ),
    ])
      .then(() => {
        this.setState(() => ({ loaded: true }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  save(values, callback) {
    const method = this.props.values.id ? "put" : "post";
    const url =
      "http://localhost:8080/taxonomia" +
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
        {this.state.loaded && (
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
              if (!values.DenominacaoId)
                errors.DenominacaoId = "Campo obrigatório";
              if (!values.taxonomia_id)
                errors.taxonomia_id = "Campo obrigatório";
            }}
            onSubmit={(values, { setSubmitting }) => {
              this.save(values, () => setSubmitting(false));
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => {
              return (
                <>
                  {console.log(values)}
                  <Form>
                    <Tabs defaultActiveKey="detalhes">
                      <Tab eventKey="detalhes" title="Detalhes">
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
                          <BSForm.Label>Denominação</BSForm.Label>
                          <ErrorMessage
                            name="denominacaoId"
                            component="span"
                            className="text-danger small ml-2"
                          />
                          <Select
                            noOptionsMessage={() => "Nada encontrado."}
                            placeholder="Pesquisar..."
                            options={this.state.denominacaos}
                            value={this.state.denominacaos.find(
                              (option) => option.value === values.DenominacaoId
                            )}
                            onChange={(option) =>
                              setFieldValue("DenominacaoId", option?.value)
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <BSForm.Label>Taxonomia Pai</BSForm.Label>
                          <ErrorMessage
                            name="taxonomia_id"
                            component="span"
                            className="text-danger small ml-2"
                          />
                          <Select
                            noOptionsMessage={() => "Nada encontrado."}
                            placeholder="Pesquisar..."
                            options={this.state.taxonomias}
                            value={this.state.taxonomias.find(
                              (option) => option.value === values.taxonomia_id
                            )}
                            onChange={(option) =>
                              setFieldValue("taxonomia_id", option?.value)
                            }
                          />
                        </FormGroup>
                      </Tab>
                      <Tab eventKey="caracteristicas" title="Características">
                        <legend>Caracteristicas Cadastradas</legend>
                        <div className="divstyle">
                          <Table striped>
                            <tbody>
                              {this.state.atributos.map((atributo, key) => (
                                <tr key={key}>
                                  <td>{atributo.label}</td>
                                  <td>
                                    <Select
                                      isClearable={true}
                                      noOptionsMessage={() =>
                                        "Nada encontrado."
                                      }
                                      placeholder="Pesquisar..."
                                      options={atributo.Caracteristicas}
                                      value={atributo.Caracteristicas.find(
                                        (option) =>
                                          option.value ===
                                          values.Caracteristicas.find(
                                            (c) => c.id === option.value
                                          )?.id
                                      )}
                                      onChange={(option) =>
                                        setFieldValue(
                                          "Caracteristicas",
                                          values.Caracteristicas.map((c) =>
                                            c.AtributoId === atributo.value
                                              ? {
                                                  id: option?.value,
                                                  AtributoId: atributo.value,
                                                }
                                              : c
                                          )
                                        )
                                      }
                                    />
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
        )}
      </>
    );
  }
}

export default TaxonomiaForm;
