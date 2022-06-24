import { faFile, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./css/index.scss";
import React from "react";
import {
  FormGroup,
  Form as BSForm,
  Button,
  Tabs,
  Tab,
  Table,
  Card,
  Image,
} from "react-bootstrap";
import Select from "react-select";
import AddFotos from "../funcoes/AddFotos";
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
            FotoCaracteristicas: this.props.values.FotoCaracteristicas ?? [],
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
          console.log(this.props.values)
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
                                  <th style={{ width: 200 }}>Imagem</th>
                                  <th>Nome</th>
                                  <th
                                    style={{ width: 120, textAlign: "center" }}
                                  >
                                    Ações
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {values.FotoCaracteristicas.filter(
                                  (foto) => !foto.deleted
                                ).map((foto, key) => (
                                  <tr key={key}>
                                    <td>
                                      <Image
                                        alt="Imagem"
                                        style={{ width: 200 }}
                                        src={foto.conteudo}
                                      />
                                    </td>
                                    <td>{foto.nome}</td>
                                    <td className="text-center">
                                      <Button
                                        size="sm"
                                        type="button"
                                        variant="danger"
                                        title="Excluir"
                                        onClick={() =>
                                          window.confirm(
                                            "Deseja realmente excluir este arquivo?"
                                          ) &&
                                          setFieldValue("FotoCaracteristicas", values.FotoCaracteristicas.filter(f => f !== foto))
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
                              </Table>
                              {values.FotoCaracteristicas.length === 0 ? (
                              <AddFotos
                                multiple={true}
                                asDataURL={true}
                                onError={(file) =>
                                  window.console.error(
                                    "Falha ao carregar o arquivo " + file.name
                                  )
                                }
                                onLoad={(fotos) =>
                                  setFieldValue("FotoCaracteristicas", fotos)
                                }
                              />
                            ) : null}
                                 </Card.Body>
                                 </Card>
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
