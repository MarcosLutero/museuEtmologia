import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoUfra from "../../img/LogoUfra.png";


class MenuTop extends React.Component {
  render() {
    return (
      <Navbar
      
        collapseOnSelect
        expand="lg"
        className="bg-success"
      >
        <Navbar.Brand role="button" as="span" >
          <img src={LogoUfra} alt="logo" height="35px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <p className="mt-3 text-white" >UFRA - UNIVERSIDADE FEDERAL RURAL DA AMAZÔNIA</p>
            
          </Nav>
          <Nav>
            {!this.props.usuario.nome ? (
              <Link className="Nav__link btn btn-outline-light" to="Login">
                Entrar
              </Link>
            ) : (
              
              <NavDropdown title={this.props.usuario.nome}>
                <NavDropdown.Item
                  a="span"
                  role="button"
                  onClick={() => {
                    this.props.logout();
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Efetuar Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MenuTop;
