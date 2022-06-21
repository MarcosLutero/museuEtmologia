import React from "react";
import "./css/index.scss";
import axios from "axios";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import aranha from "../../img/aranha.jpg";
import borboleta from "../../img/borboleta.jpeg";
import formiga from "../../img/formiga.jpg";

class PaginaInicial extends React.Component {
  state = {
    filter: "",
    tipo: "",
    resultados: [],
  };

  changeTipo(tipo) {
    if (tipo) {
      axios
        .get(`http://localhost:8080/${tipo}`)
        .then((response) => {
          this.setState(() => ({ resultados: response.data, tipo: tipo }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState(() => ({ resultados: [], tipo: null }));
    }
  }

  submit = (event) => {
    event.preventDefault();
    if (this.state.tipo) window.open("/pesquisa", this.props.resultados);
  };

  render() {

    return (
      <Container>
        <Row>
          <Col>
            <Form.Group onSubmit={(event) => this.submit(event)}>
              <Row className="d-flex align-items-center flex-wrap px-2">
                <Col lg={4} className="my-1">
                  <Form.Select
                    className="ponta-redonda w-100 tamanho-select fonte_familia  text-uppercase"
                    onChange={(e) => this.changeTipo(e.target.value)}
                  >
                    <option value="">Pesquisar Por</option>
                    <option value="respostaTaxonomia">Taxonomia</option>
                    <option value="respostaAtributoCaracteristica">
                      Característica
                    </option>
                  </Form.Select>
                </Col>
                <Col lg={8} className="my-1">
                  <Form.Control
                    className="ponta-redonda fonte_familia  text-uppercase"
                    type="text"
                    placeholder="Pesquisar"
                    value={this.state.filter}
                    onChange={(event) =>
                      this.setState(() => ({ filter: event.target.value }))
                    }
                  />
                  <Button type="submit" className="d-none" />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <CardGroup>
            <Card className="sombra mx-4 my-3">
              <Card.Img variant="top" alt="aranha" src={aranha} />
              <Card.Body>
                <Card.Title className="fonte_familia text-center text-uppercase">
                  Aranhas
                </Card.Title>
                <Card.Text className="text-justify fonte_familia">
                  Araneae é uma ordem de artrópodes da classe Arachnida que
                  inclui as espécies conhecidas pelos nomes comuns de aranhas ou
                  aracnídeos. Tem distribuição natural em todos os continentes e
                  ocorrência em praticamente todos os tipos de habitats
                  terrestres.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="sombra mx-4 my-3">
              <Card.Img
                variant="top"
                alt="formiga"
                className="m-0 p-0"
                src={formiga}
              />
              <Card.Body>
                <Card.Title className="fonte_familia text-center  text-uppercase">
                  Formigas
                </Card.Title>
                <Card.Text className="text-justify fonte_familia">
                  As formigas são insetos pertencentes à família Formicidae da
                  ordem Hymenoptera. São insetos particularmente populares por
                  serem muito comuns e tidos como altamente organizados.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="sombra mx-4 my-3">
              <Card.Img
                variant="top"
                alt="boboleta"
                className="foto"
                src={borboleta}
              />
              <Card.Body>
                <Card.Title className="fonte_familia text-center text-uppercase">
                  Borboletas
                </Card.Title>
                <Card.Text className="text-justify fonte_familia">
                  As borboletas, são insetos da ordem Lepidoptera classificados
                  nas super famílias Hesperioidea e Papilionoidea, que
                  constituem o grupo informal "Rhopalocera". Como outros
                  insectos de holometabolismo, o seu ciclo de vida consiste em
                  quatro fases: ovo, larva, pupa e imago (Adulto)
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Row>
      </Container>
    );
  }
}

export default PaginaInicial;
