import axios from "axios";
import React from "react";
import {
  faBackward,
  faFastBackward,
  faFastForward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Button,
  FormControl,
  Table,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

class Datatable extends React.Component {
  state = {
    data: {
      headers: [],
      rows: [],
    },
    filter: "",
  };

  componentDidMount() {
    this.update();
  }

  update() {
    const config = {
      headers: { Authorization: "Bearer " + this.props.token },
    };
    axios.get(this.props.url, config).then((response) => {
      this.setState(() => ({ data: response.data }));
    });
  }
 
  onClickAdd() {
    if (this.props.onClickAdd) {
      this.props.onClickAdd(() => this.update());
    }
  }
  render() {
    

    return (
      <Table responsive condensed striped className="bg-light">
        <thead>
          <tr>
            <td>Ola</td>
          </tr>
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
                      onClick={() =>
                        this.props.onAction(action, row.id, () => this.update())
                      }
                    >
                      {action}
                    </Button>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}

export default Datatable;
