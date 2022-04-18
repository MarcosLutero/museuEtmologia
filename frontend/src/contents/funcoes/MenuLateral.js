import React from "react";
import {Card, ListGroup } from "react-bootstrap";
import CdrIdentificacao from '../Componentes/CdrIdentificacao.js'
import CdrEspecime from '../Componentes/CdrEspecime.js'
import CdrTaxonomia from '../Componentes/CdrTaxonomia.js'

class MenuLateral extends React.Component {
  render() {
    return (
      <Card border="dark">
        <Card.Header>
          <h3>Menu CdrIdentificacao</h3>
        </Card.Header>
        <Card.Body>
          <ListGroup >
            <ListGroup.Item role="button" onClick={() => this.props.setPagina(CdrIdentificacao)}>Cadastar Identificação</ListGroup.Item>
            <ListGroup.Item role="button" onClick={() => this.props.setPagina(CdrTaxonomia)}>Cadastar Taxonomia</ListGroup.Item>
            <ListGroup.Item role="button" onClick={() => this.props.setPagina(CdrEspecime)}>Cadastar Especime</ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    );
  }
}

export default MenuLateral;
