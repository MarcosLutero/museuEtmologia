import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuTop from "./funcoes/MenuTop.js";
import Modal from "./funcoes/Modal";
import Login from "./Componentes/Login.js";

class App extends React.Component {
  state = {
    usuario: {
      id: null,
      login: null,
      nome: "Marcos lutero",
    },
  };
  render() {
    return (
      <Container fluid={true}>
        <MenuTop
          usuario={this.state.usuario}
          logout={() => {
            this.setState({ usuario: { id: null, login: null, nome: null }});
          }}
        />
      </Container>
    );
  }
}

export default App;
