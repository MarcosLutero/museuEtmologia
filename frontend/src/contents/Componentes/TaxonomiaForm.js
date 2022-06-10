import {
  faDownload,
  faFile,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
  Card,
} from "react-bootstrap";
import Select from "react-select";
import "./css/index.scss";
import fileSize from "filesize";
import AddFotos from "../funcoes/AddFotos";

class TaxonomiaForm extends React.Component {
  uploadRef = React.createRef();
  state = {
    taxonomias: [],
    denominacaos: [],
    atributos: [],
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
              FotoTaxonomia: this.props.values.FotoTaxonomia ?? [],
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
                        <Card className="mt-3">
                          <Card.Body
                            title={
                              <div title="Fotos">
                                <FontAwesomeIcon icon={faFile} />
                                <span className="d-none d-lg-inline">
                                  Fotos
                                </span>
                              </div>
                            }
                          >
                            <Table
                              striped
                              size="sm"
                              responsive
                              className="my-2"
                            >
                              <thead className="bg-light">
                                <tr>
                                  <th>Nome</th>
                                  <th
                                    style={{ width: 120, textAlign: "center" }}
                                  >
                                    Ações
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {values.FotoTaxonomia.filter(
                                  (foto) => !foto.deleted
                                ).map((foto, key) => (
                                  <tr key={key}>
                                    <td>{foto.nome}</td>
                                    <td className="text-center">
                                      {foto.id ? (
                                        <Button
                                          as="a"
                                          download={foto.nome}
                                          size="sm"
                                          href={setFieldValue("FotoTaxonomia")}
                                          variant="info"
                                          title="Download"
                                          className="mr-2"
                                        >
                                          <FontAwesomeIcon
                                            icon={faDownload}
                                          ></FontAwesomeIcon>
                                        </Button>
                                      ) : null}
                                      <Button
                                        size="sm"
                                        type="button"
                                        variant="danger"
                                        title="Excluir"
                                        onClick={() =>
                                          window.confirm(
                                            "Deseja realmente excluir este arquivo?"
                                          ) && setFieldValue("Fotos", values.FotoTaxonomia)
                                        }
                                      >
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                        ></FontAwesomeIcon>
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan={4}>
                                    {values.FotoTaxonomia.length === 0 ? (
                                      <AddFotos
                                        onError={(file) =>
                                          window.console.error(
                                            "Falha ao carregar o arquivo " +
                                              file.name
                                          )
                                        }
                                        onLoad={(fotos) =>
                                          setFieldValue("FotoTaxonomia", [
                                            ...values.Fotos,
                                            ...fotos,
                                          ])
                                        }
                                      />
                                    ) : null}
                                  </td>
                                </tr>
                              </tfoot>
                            </Table>
                          </Card.Body>
                        </Card>
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
                                                  nome: option?.value,
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
