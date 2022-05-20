import React from "react";
import "./css/index.scss";
import { Card, Col, Row } from "react-bootstrap";
import aranha from "../../img/aranha.jpg";
import borboleta from "../../img/borboleta.jpeg";
import formiga from "../../img/formiga.jpg";

class PaginaInicial extends React.Component {
  render() {
    return (
      <>
        <div className="paginaInicial">
          <div className="container">
            <input
              className="pesquisar"
              type="text"
              name="inseto"
              required
              placeholder="Digite o Nome do Inseto"
            />
          </div>

          <Row xl={3} className="mt-5 mx-auto">
            <Col>
              <Card>
                <img src={aranha} className="aranha" />
                <p className="frase">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged
                </p>
              </Card>
            </Col>
            <Col>
              <Card>
                <img src={borboleta} className="borboleta" />
                <p className="frase">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged
                </p>
              </Card>
            </Col>
            <Col>
              <Card>
                <img src={formiga} className="formiga" />
                <p className="frase">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default PaginaInicial;
