import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
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
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import Select from "react-select";

class EspecimeForm extends React.Component {
  static defaultProps = {
    values: {},
  };
  state = {
    taxonomias: [],
    denominacaos: [],
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
    ]);
  }

  save(values, callback) {
    const method = this.props.values.id ? "put" : "post";
    const url =
      "http://localhost:8080/especie" +
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
            if (!values.descricao) errors.descricao = "Campo obrigatório";
            console.log(values);
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.save(values, () => setSubmitting(false));
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => {
            return (
              <>
                {console.log(this.state.taxonomias)}
                <Form>
                  <Tabs defaultActiveKey="especie">
                    <Tab eventKey="especie" title="Especie">
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
                        <BSForm.Label>Descricao</BSForm.Label>
                        <ErrorMessage
                          name="descricao"
                          component="span"
                          className="text-danger small ml-2"
                        />
                        <Field
                          as="textarea"
                          name="descricao"
                          className="form-control"
                          value={values.descricao}
                        />
                      </FormGroup>
                    </Tab>
                    <Tab eventKey="taxonomias " title="Denominação/Taxonomia">
                      <legend>Denominacao/Taxonomia Cadastrada</legend>
                      <div className="divstyle">
                        <Table striped>
                          <tbody>
                              
                          </tbody>
                        </Table>
                      </div>
                    </Tab>
                    <Tab
                      eventKey="caracteristica "
                      title="Caracteristicas"
                    ></Tab>
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
      </>
    );
  }
}

export default EspecimeForm;
