import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { FormGroup, Form as BSForm, Button } from "react-bootstrap";
import Select from "react-select";
class IdentificacaoList extends React.Component {

  state={
    atributos:[]
  }
  componentDidMount() {
    
  }

  render() {
    return (
      <Formik
        initialValues={{
          nome: this.props.values?.nome,
          descricao: this.props.values?.descricao,
          atributo: this.props.values?.atributo,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.nome) {
            errors.nome = "Campo obrigatório";
          }
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.save(values, () => setSubmitting(false));
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <Form>
              <FormGroup>
                <BSForm.Label>Nome</BSForm.Label>
                <ErrorMessage
                  name="nome"
                  component="span"
                  className="text-danger small ml-2"
                />
                <Field type="text" name="nome" className="form-control" />
              </FormGroup>
              <FormGroup>
                <BSForm.Label>Descrição</BSForm.Label>
                <ErrorMessage
                  name="descricao"
                  component="span"
                  className="text-danger small ml-2"
                />
                <Field
                  as="textarea"
                  name="descricao"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <BSForm.Label>Atributo</BSForm.Label>
                <ErrorMessage
                  name="atributo"
                  component="span"
                  className="text-danger small ml-2"
                />
                <Select
                noOptionsMessage={() => "Nada encontrado."}
                placeholder="Pesquisar..."
                options={this.state.atributos}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="ml-2"
                >
                  <FontAwesomeIcon icon={faSave} />
                  &nbsp; Gravar Alterações
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default IdentificacaoList;
