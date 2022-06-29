import React from "react";
import "./css/index.scss";
import axios from "axios";
import {
  Alert,
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
        {this.state.resultados.length < 1 && (
          <>
            {alert("não encontrado")}
            {window.location.reload(true)}
          </>
        )}
        <>
          {this.state.resultados ? (
            <>
              {console.log(this.state.resultados)}
              {this.state.tipo === "respostaTaxonomia" ? (
                <Container fluid style={{ backgroundColor: "white" }}>
                  {this.state.resultados.map((taxonomia, key) => (
                    <Table
                      striped
                      key={key}
                      bordered
                      hover
                      className="mt-5 shadow"
                      responsive
                    >
                      <thead>
                        <tr>
                          <th colSpan="4" className="text-center">
                            <Carousel fade>
                              {taxonomia.foto.map((f) => (
                                <Carousel.Item>
                                  <img alt="foto" src={f} />
                                </Carousel.Item>
                              ))}
                            </Carousel>
                          </th>
                        </tr>
                        <tr>
                          <th
                            colSpan="4"
                            className="text-center text-uppercase"
                          >
                            {taxonomia.nome}
                          </th>
                        </tr>
                        <tr>
                          <th>Pertence a Taxonomia:</th>
                          <th> Denominação</th>
                          <th colSpan={2} className="text-center">
                            Caracteristicas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> {taxonomia.pai?.nome}</td>
                          <td>{taxonomia.denominacao?.nome}</td>
                          <td>
                            {taxonomia.atributos?.map((atributo, key) => (
                              <Table key={key} responsive="lg">
                                <tbody>
                                  <tr>
                                    <td>{atributo.identificacao}</td>
                                    <td>{atributo.nome} </td>
                                  </tr>
                                </tbody>
                              </Table>
                            ))}
                          </td>
                          <td>
                            {taxonomia.caracteristicas?.map(
                              (caracteristicas, key) => (
                                <Table striped key={key} bordered hover>
                                  <tbody>
                                    <tr>
                                      <td>{caracteristicas.nome}</td>
                                      <td>{caracteristicas.descricao} </td>
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
                <Container style={{ backgroundColor: "white" }}>
                  {this.state.resultados.map((atributo, key) => (
                    <Table striped key={key} bordered hover>
                      <thead>
                        <tr colSpan="3" className="text-center text-uppercase">
                          <td>{atributo.nome}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {atributo.Caracteristicas.map(
                              (caracteristica, key) => (
                                <Table striped key={key} bordered hover>
                                  <thead>
                                    <tr>
                                      <th>nome</th>
                                      <th> descricao</th>
                                      <th>Foto</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>{caracteristica.nome}</td>
                                      <td>{caracteristica.descricao}</td>
                                      <td>
                                        {
                                          caracteristica.FotoCaracteristicas
                                            .conteudo
                                        }
                                      </td>
                                    </tr>
                                  </tbody>
                                  {console.log(caracteristica)}
                                </Table>
                              )
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  ))}
                </Container>
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
                        Araneae é uma ordem de artrópodes da classe Arachnida
                        que inclui as espécies conhecidas pelos nomes comuns de
                        aranhas ou aracnídeos. Tem distribuição natural em todos
                        os continentes e ocorrência em praticamente todos os
                        tipos de habitats terrestres.
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
                        As formigas são insetos pertencentes à família
                        Formicidae da ordem Hymenoptera. São insetos
                        particularmente populares por serem muito comuns e tidos
                        como altamente organizados.
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
                        "Rhopalocera". Como outros insectos de holometabolismo,
                        o seu ciclo de vida consiste em quatro fases: ovo,
                        larva, pupa e imago (Adulto)
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </CardGroup>
              </Row>
            </Container>
          )}
        </>
      </>
    );
  }
}

export default PaginaInicial;
