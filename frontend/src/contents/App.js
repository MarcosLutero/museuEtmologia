import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Componentes/Login.js";
import PaginaInicial from "./Componentes/PaginaInicial.js";
import Principal from "./Componentes/Principal.js";
import MenuTop from "./funcoes/MenuTop.js";

import "./App.css";

class App extends React.Component {
  state = {

    usuario: JSON.parse(localStorage.getItem("usuario")) ?? {
      login: null,
      nome: null,
      token: null
    },
  };
  render() {
    return (
      <section>
        <div className="layout">
          <BrowserRouter>
            <MenuTop
              usuario={this.state.usuario}
              logout={() => {
                this.setState({
                  usuario: {login: null, nome: null,token: null},
                });
              }}
            />

            <Routes>
              <Route path="/" element={<PaginaInicial />} />
              <Route path="Login" element={<Login setUsuario={usuario=>{this.setState({usuario})}}/>} />
              <Route path="Principal" element={<Principal />} />
            </Routes>
          </BrowserRouter>
        </div>
      </section>
    );
  }
}

export default App;
