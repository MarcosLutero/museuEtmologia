import { faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";


class PaginaInicial extends React.Component {
  render() {
    return ( 
          <Row className="my-5">
            <Col lg={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Header>
                <Card.Title as="span">Pesquise</Card.Title>
              </Card.Header>
              <Card.Body>
                <form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Inseto</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          <FontAwesomeIcon icon={faBug} />
                        </InputGroup.Text>
                        <FormControl
                          type="text"
                          name="inseto"
                          required
                          placeholder="Nome do Inseto"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </form>
              </Card.Body>
              <Card.Footer>
                <Row className="justify-content-md-center">
                  <Col md="auto">
                    UFRA - UNIVERSIDADE FEDERAL RURAL DA AMAZÔNIA
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
            </Col>
          </Row>
     
      
    );
  }
}

export default PaginaInicial;
