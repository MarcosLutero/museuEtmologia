import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  Row,
} from "react-bootstrap";
import axios from "axios";
import "./css/index.scss";
import Fundo1 from "../../video/Fundo1.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

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
      .post("http://localhost:8080/usuario/login", {
        login: this.state.login,
        senha: this.state.senha,
      })
      .then((res) => {
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
      <>
        <Container fluid className="m-0 p-0" id="login">
          <Row className="m-0 p-0 cor-fundo-verde">
            <Col className="m-0 p-0" lg={6}>
              <Image
              fluid
                src={Fundo1}
                alt="First slide"
              />
            </Col>
            <Col
              className=" text-white  d-flex align-items-center justify-content-center text-center"
              lg={{offset:1, span:4}}
            >
              <div className="borda-branca borda-redonda p-3 w-100 mt-5 mb-2">
                <h1 className="titulo_form font-weight-bolder">
                  Login no Sistema
                </h1>
                <Form onSubmit={(event) => this.login(event)} className="w-100">
                  <FormControl
                    type="text"
                    name="login"
                    className="my-4"
                    required
                    placeholder="Usuário"
                    onChange={this.login_user.bind(this)}
                  />
                  <FormControl
                    type="password"
                    name="senha"
                    className="my-4"
                    required
                    placeholder="Senha"
                    onChange={this.senha_user.bind(this)}
                  />
                  <Button
                    className="btn-lg my-4 w-100"
                    type="submit"
                    variant="success"
                    disabled={this.state.loading}
                  >
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                    Login
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Login;
