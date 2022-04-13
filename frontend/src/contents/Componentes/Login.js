import {
  faClock,
  faKey,
  faSignInAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import axios from "axios";

class Login extends React.Component {
  state = {
    loading: false,
    login: null,
    senha: null,
    token: null,
  };

  login_user(event) {
    this.setState(() => ({ login: event.target.value }));
  }
  senha_user(event) {
    this.setState(() => ({ senha: event.target.value }));
  }

  login = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8080/usuario/login",
        {
          login: this.state.login,
          senha: this.state.senha,
        }
      )
      .then((res) => {
        console.log(res)
        this.props.setUsuario(res.data);
        localStorage.setItem("usuario", JSON.stringify(res.data));

      })
      .catch((err) => {
        var titulo, conteudo;
        console.log(err);
        if (err) {
          switch (err.status) {
            case 401:
              titulo = "Login não autorizado";
              conteudo = "Usuário bloqueado pela administração";
              break;
            case 404:
              titulo = "Falha no Login";
              conteudo = "Usuário e senha não conferem.";
              break;
            default:
              titulo = "Falha na comunicação com o servidor";
              conteudo = err.text;
              break;
          }
        }
      });
  };
  render() {
    return (
      <Row className="my-5">
        <Col lg={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Header>
              <Card.Title as="span">Acesso ao Sistema</Card.Title>
            </Card.Header>
            <Card.Body>
              <form onSubmit={(event) => this.login(event)}>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Usuário</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <FormControl
                        type="text"
                        name="login"
                        required
                        placeholder="Usuário"
                        onChange={this.login_user.bind(this)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Senha</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        <FontAwesomeIcon icon={faKey} />
                      </InputGroup.Text>
                      <FormControl
                        type="password"
                        name="senha"
                        required
                        placeholder="Senha"
                        onChange={this.senha_user.bind(this)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="primary"
                      className="form-control"
                      type="submit"
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? (
                        <FontAwesomeIcon icon={faClock} />
                      ) : (
                        <FontAwesomeIcon icon={faSignInAlt} />
                      )}
                      Entrar
                    </Button>
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

export default Login;
