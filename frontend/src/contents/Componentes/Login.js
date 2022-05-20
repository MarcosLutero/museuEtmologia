import React from "react";
import {
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import "./css/index.scss";
import Fundo1 from "../../video/Fundo1.gif";

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
        <div id="page-auth">
          <div className="lado_esquerdo">
           <h3 className="boasvindas">Bem Vindo Ao Museu da UFRA</h3>
            <img className="img_login" src={Fundo1} alt="First slide" />
          </div>
          <main>
            <div className="main-content">
              <div className="formulario">
                <h3 className="titulo_form">Login no Sistema</h3>
                <form onSubmit={(event) => this.login(event)}>
                  <FormControl
                    className="input"
                    type="text"
                    name="login"
                    required
                    placeholder="Usuário"
                    onChange={this.login_user.bind(this)}
                  />
                  <FormControl
                    className="input"
                    type="password"
                    name="senha"
                    required
                    placeholder="Senha"
                    onChange={this.senha_user.bind(this)}
                  />
                  <button
                    className="botao_submit"
                    type="submit"
                    disabled={this.state.loading}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default Login;
