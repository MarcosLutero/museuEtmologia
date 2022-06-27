import React from "react";
import "./css/index.scss";
import axios from "axios";
import {
  Button,
  Card,
  CardGroup,
  Carousel,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import aranha from "../../img/aranha.jpg";
import borboleta from "../../img/borboleta.jpeg";
import formiga from "../../img/formiga.jpg";

class PaginaInicial extends React.Component {
  state = {
    filter: "",
    tipo: "",
    resultados: false,
  };

  submit(event) {
    event.preventDefault();
    axios
      .get(
        `http://localhost:8080/${this.state.tipo}/?filter=${this.state.filter}`
      )
      .then((response) => {
        this.setState({ resultados: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        {this.state.resultados ? (
          <>
            {this.state.tipo === "respostaTaxonomia" ? (
              <Container style={{ backgroundColor: "white" }}>
                {console.log(this.state.resultados)}
                {this.state.resultados.map((taxonomia, key) => (
                  <Table striped key={key} bordered hover>
                    <thead>
                      <tr>
                        <th colSpan="3">
                          {taxonomia.FotoTaxonomias.map((foto, key) => (
                            <Carousel key={key}>
                              <Carousel.Item>
                                <Image alt="foto" src={foto.conteudo} />
                              </Carousel.Item>
                            </Carousel>
                          ))}
                        </th>
                      </tr>
                      <tr>
                        <th colSpan="3" className="text-center text-uppercase">
                          {taxonomia.nome}
                        </th>
                      </tr>
                      <tr>
                        <th>Pertence a Taxonomia:</th>
                        <th> Denominação</th>
                        <th> Caracteristicas</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> {taxonomia.Pai?.nome}</td>
                        <td>{taxonomia.Denominacao?.nome}</td>
                        <td>
                          {taxonomia.Caracteristicas?.map(
                            (caracteristica, key) => (
                              <Table striped key={key} bordered hover>
                                <tbody>
                                  <tr>
                                    <td>{caracteristica.Atributo.nome} </td>
                                    <td>{caracteristica.nome}</td>
                                    <td>{caracteristica.descricao}</td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </Table>
                            )
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ))}
              </Container>
            ) : this.state.tipo === "respostaAtributoCaracteristica" ? (
              <Container>{console.log(this.state.resultados)}</Container>
            ) : null}
          </>
        ) : (
          <Container>
            <Row>
              <Col>
                <Form onSubmit={(event) => this.submit(event)}>
                  <Row className="d-flex align-items-center flex-wrap px-2">
                    <Col lg={4} className="my-1">
                      <Form.Select
                        className="ponta-redonda w-100 tamanho-select fonte_familia  text-uppercase"
                        onChange={(event) =>
                          this.setState({ tipo: event.target.value })
                        }
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
                          this.setState({ filter: event.target.value })
                        }
                      />
                      <Button type="submit" className="d-none" />
                    </Col>
                  </Row>
                </Form>
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
                      inclui as espécies conhecidas pelos nomes comuns de
                      aranhas ou aracnídeos. Tem distribuição natural em todos
                      os continentes e ocorrência em praticamente todos os tipos
                      de habitats terrestres.
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
                      As formigas são insetos pertencentes à família Formicidae
                      da ordem Hymenoptera. São insetos particularmente
                      populares por serem muito comuns e tidos como altamente
                      organizados.
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
                      As borboletas, são insetos da ordem Lepidoptera
                      classificados nas super famílias Hesperioidea e
                      Papilionoidea, que constituem o grupo informal
                      "Rhopalocera". Como outros insectos de holometabolismo, o
                      seu ciclo de vida consiste em quatro fases: ovo, larva,
                      pupa e imago (Adulto)
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default PaginaInicial;
