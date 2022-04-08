import {
  faClock,
  faIdCard,
  faKey,
  faSignOutAlt,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import LogoUfra from "../../img/LogoUfra.png";
import MenuLeft from "./MenuLeft";

class MenuTop extends React.Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar navbar-light bg-success mb-3"
      >
        <Navbar.Brand
          role="button"
          as="span"
          onClick={() =>
            this.props.usuario
              ? this.props.setContent("PaginaInicial", true, "UFRA")
              : null
          }
        >
          <img src={LogoUfra} alt="logo" height="35px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
              UFRA - UNIVERSIDADE FEDERAL RURAL DA AMAZÔNIA
          </Nav>

          <Nav>
            <NavDropdown title={this.props.usuario.nome ? this.props.usuario.nome:"Entrar" }>
                {this.props.usuario.nome? <>
                <NavDropdown.Item as="span" role="button">
                    <FontAwesomeIcon icon={faKey} /> Trocar Senha
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item a="span" role="button" onClick={()=>{this.props.logout()}}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Efetuar Logout
                </NavDropdown.Item>
                </>: null}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MenuTop;
