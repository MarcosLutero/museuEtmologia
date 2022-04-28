import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
class AtributoCaracteristicaForm extends React.Component {
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
          nome: this.props.values?.nome,
          identificacao: this.props.values?.identificacao,
          Caracteristicas: this.props.values.Caracteristicas??[],
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
                        }}
                      />
                    </FormGroup>
                  </Tab>
                  <Tab eventKey="detalhes" title="Detalhes">
                    <legend>Caracteristicas Cadastradas</legend>
                    <Table>
                      <thead>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                      </thead>
                      <tbody>
                        {this.props.values.Caracteristicas.map(
                          (caracteristica, key) => (
                            <tr key={key}>
                              <td>{caracteristica.nome}</td>
                              <td>{caracteristica.descricao}</td>
                              <td>
                                <Button
                                  className="form-control"
                                  variant="danger"
                                  size="sm"
                                  onClick={() =>
                                    setFieldValue(
                                      "Caracteristicas",
                                      values.Caracteristicas.filter((c) => c !== caracteristica)
                                    )
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
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
