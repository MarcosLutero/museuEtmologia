import axios from "axios";
import React from "react";
import { Form, Button, FormControl, Table, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

class Datatable extends React.Component {
  state = {
    data: {
      headers: [],
      rows: [],
    },
    filter: "",
    values: {},
    show: false,
  };

  config = {
    headers: { Authorization: "Bearer " + this.props.token },
  };

  onAction(action, id) {
    switch (action) {
      case "Excluir":
        if (window.confirm("Deseja realmente excluir este registro?")) {
          axios
            .delete(`${this.props.url}/${id}`, this.config)
            .then((res) => {
              this.update();
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      case "Editar":
        axios
          .get(`${this.props.url}/${id}`, this.config)
          .then((res) => {
            this.setState(() => ({ values: res.data, show: true }));
          })
          .catch((err) => {
            console.log(err);
          });

        break;

      default:
        break;
    }
  }

  componentDidMount() {
    this.update();
  }

  update() {
    axios.get(this.props.url, this.config).then((response) => {
      this.setState(() => ({ data: response.data }));
    });
  }

  onClickAdd() {
    this.setState(() => ({ values: {}, show: true }));
  }

  render() {
    return (
      <>
        <Table responsive striped className="bg-light">
          <thead>
            <tr className="d-print-none">
              <td colSpan={this.state.data.headers.length}>
                <Form as="div" className="d-flex align-items-stretch flex-wrap">
                  <div className="mr-2 my-2 flex-fill">
                    <Button
                      size="sm"
                      style={{ width: "100%" }}
                      variant="outline-success"
                      onClick={() => this.onClickAdd()}
                    >
                      <FontAwesomeIcon icon={Icons.faPlus} />
                      &nbsp;Adicionar
                    </Button>
                  </div>
                  <div className="mr-2 my-2 flex-fill">
                    <InputGroup size="sm" style={{ width: "100%" }}>
                      <InputGroup.Text variant="primary">
                        <FontAwesomeIcon icon={Icons.faSearch} />
                      </InputGroup.Text>
                      <FormControl
                        type="text"
                        placeholder="Pesquisar"
                        value={this.state.filter}
                        onChange={(event) =>
                          this.setState(() => ({ filter: event.target.value }))
                        }
                      />
                    </InputGroup>
                  </div>
                </Form>
              </td>
            </tr>
            <tr>
              {this.state.data.headers.map((header, key) => (
                <th key={key}>{header}</th>
              ))}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.rows
              .filter((row) =>
                row.columns.some((column) => column.includes(this.state.filter))
              )
              .slice()
              .map((row, key) => (
                <tr key={key}>
                  {row.columns.map((column, key) => (
                    <td key={key}>{column}</td>
                  ))}
                  <td>
                    {row.actions.map((action, key) => (
                      <Button
                        className="ml-1"
                        size="sm"
                        key={key}
                        variant="outline-primary"
                        onClick={() => this.onAction(action, row.id)}
                      >
                        {action}
                      </Button>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Modal
          title="Editar Regitro"
          show={this.state.show}
          onHide={() => this.setState(() => ({ show: false }))}
          body={
            <this.props.FormComponent
              update={() => this.update()}
              values={this.state.values}
              usuario={this.props.usuario}
              close={() =>
                this.setState(
                  () => ({ show: false }),
                  () => this.update()
                )
              }
            />
          }
        />
      </>
    );
  }
}

export default Datatable;
