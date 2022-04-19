import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import IdentificacaoList from "../Componentes/IdentificacaoList.js";
import EspecimeList from "../Componentes/EspecimeList.js";
import TaxonomiaList from "../Componentes/TaxonomiaList.js";
import PaginaInicial from "../Componentes/PaginaInicial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faDog,
  faHome,
  faIndent,
} from "@fortawesome/free-solid-svg-icons";

class MenuLateral extends React.Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <h3>Menu Principal</h3>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item
              role="button"
              onClick={() => this.props.setPagina(PaginaInicial)}
            >
              <FontAwesomeIcon icon={faHome} />
               &nbsp; Home
            </ListGroup.Item>
            <ListGroup.Item
              role="button"
              onClick={() => this.props.setPagina(IdentificacaoList)}
            >
              <FontAwesomeIcon icon={faIndent} />
              &nbsp;Cadastar Identificação
            </ListGroup.Item>
            <ListGroup.Item
              role="button"
              onClick={() => this.props.setPagina(TaxonomiaList)}
            >
              <FontAwesomeIcon icon={faClipboardList} />
              &nbsp;Cadastar Taxonomia
            </ListGroup.Item>
            <ListGroup.Item
              role="button"
              onClick={() => this.props.setPagina(EspecimeList)}
            >
              <FontAwesomeIcon icon={faDog} />
              &nbsp;Cadastar Especime
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    );
  }
}

export default MenuLateral;
