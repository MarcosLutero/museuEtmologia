import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Componentes/Login.js";
import PaginaInicial from "./Componentes/PaginaInicial.js";
import EspecimeList from "./Componentes/EspecimeList";
import MenuTop from "./funcoes/MenuTop.js";
import "./App.css";
import { Col, Row } from "react-bootstrap";
import MenuLateral from "./funcoes/MenuLateral.js";

class App extends React.Component {
  state = {
    Pagina: PaginaInicial,
    usuario: JSON.parse(localStorage.getItem("usuario")) ?? {
      login: null,
      nome: null,
      token: null,
    },
  };
  render() {
    const Pagina = this.state.Pagina;
    return (
      <section>
        <div className="img"/>
        <div className="layout">
          <BrowserRouter>
            <MenuTop
              usuario={this.state.usuario}
              logout={() => {
                this.setState(
                  {
                    usuario: { login: null, nome: null, token: null },
                  },
                  () => {
                    localStorage.setItem("usuario", JSON.stringify({}));
                  }
                );
              }}
            />

            <Routes>
              <Route path="/" element={<PaginaInicial />} />
              <Route
                path="/admin"
                element={
                  this.state.usuario.token ? (
                    <Row>
                      <Col md="3">
                        <MenuLateral
                          setPagina={(Pagina) => {
                            this.setState({ Pagina });
                          }}
                        />
                      </Col>
                      <Col md="9">
                        <Pagina
                          setPagina={(Pagina) => {
                            this.setState({ Pagina });
                          }}
                          setUsuario={(usuario) => {
                            this.setState({ usuario });
                          }}
                          usuario={this.state.usuario}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Login
                      setUsuario={(usuario) => {
                        this.setState({ usuario, Pagina: EspecimeList });
                      }}
                    />
                  )
                }
              />
            </Routes>
          </BrowserRouter>
        </div>

      </section>
    );
  }
}

export default App;
