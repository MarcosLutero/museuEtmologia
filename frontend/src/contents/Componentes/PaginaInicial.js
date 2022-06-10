import React from "react";
import "./css/index.scss";
import axios from "axios";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
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
    if (this.state.tipo)
     window.open("/pesquisa", this.props.resultados)
      
  };

  render() {
    return (
      <>
        <div className="paginaInicial">
          <div className="container">
            <Form onSubmit={(event) => this.submit(event) }>
            <InputGroup className="mt-5">
              <Form.Select
                className="label-pesquisar"
                onChange={(e) => this.changeTipo(e.target.value)}
              >
                <option value= "">Tipo de Pesquisa</option>
                <option value="respostaTaxonomia">Taxonomia</option>
                <option value="respostaAtributoCaracteristica">
                  Característica
                </option>
              </Form.Select>
              <FormControl
                className="pesquisar"
                type="text"
                placeholder="Pesquisar"
                value={this.state.filter}
                onChange={(event) =>
                  this.setState(() => ({ filter: event.target.value }))
                }
              />
              <Button type="submit" className="d-none" />
            </InputGroup>
            </Form>
          </div>
        

          <div className="container2">
            <Row xl={3} className="mt-5">
              <Col>
                <div className="card">
                  <div className="image">
                    <img alt="aranha" className="img_animal" src={aranha} />
                  </div>
                  <div className="content">
                    <h3>Aranhas</h3>
                    <p>
                      Araneae é uma ordem de artrópodes da classe Arachnida que
                      inclui as espécies conhecidas pelos nomes comuns de
                      aranhas ou aracnídeos. Tem distribuição natural em todos
                      os continentes e ocorrência em praticamente todos os tipos
                      de habitats terrestres.
                    </p>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="card">
                  <div className="image">
                    <img alt="formiga" className="img_animal " src={formiga} />
                  </div>
                  <div className="content">
                    <h3>Formigas</h3>
                    <p>
                      As formigas são insetos pertencentes à família Formicidae
                      da ordem Hymenoptera. São insetos particularmente
                      populares por serem muito comuns e tidos como altamente
                      organizados.
                    </p>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="card">
                  <div className="image">
                    <img
                      alt="boboleta"
                      className="img_animal"
                      src={borboleta}
                    />
                  </div>
                  <div className="content">
                    <h3>Borboletas</h3>
                    <p>
                      As borboletas, são insetos da ordem Lepidoptera
                      classificados nas super famílias Hesperioidea e
                      Papilionoidea, que constituem o grupo informal
                      "Rhopalocera". Como outros insectos de holometabolismo, o
                      seu ciclo de vida consiste em quatro fases: ovo, larva,
                      pupa e imago (Adulto)
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export default PaginaInicial;
