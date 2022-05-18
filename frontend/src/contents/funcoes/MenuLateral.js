import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import TaxonomiaList from "../Componentes/TaxonomiaList.js";
import AtributoCaracteristicaList from "../Componentes/AtributoCaracteristicaList.js";
import DenominacaoList from "../Componentes/DenominacaoList.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faIndent,
  faPaw,
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
              onClick={() => this.props.setPagina(TaxonomiaList)}
            >
              <FontAwesomeIcon icon={faClipboardList} />
              &nbsp;Cadastar Taxonomia
            </ListGroup.Item>

            <ListGroup.Item
              role="button"
              onClick={() => this.props.setPagina(AtributoCaracteristicaList)}
            >
              <FontAwesomeIcon icon={faIndent} />
              &nbsp;Cadastar Atributos/Caracteristica
            </ListGroup.Item>
            
            <ListGroup.Item
              role="button"
              onClick={() => this.props.setPagina(DenominacaoList)}
            >
              <FontAwesomeIcon icon={faPaw} />
               &nbsp; Cadastrar Denominação
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default MenuLateral;
