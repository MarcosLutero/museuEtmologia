import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import LogoUfra from "../../img/LogoUfra.png";
import "../App.scss"

class MenuTop extends React.Component {
  render() {
    return (
        <Navbar collapseOnSelect className="navbar ">
          <Navbar.Brand role="button" as="span">
            <img src={LogoUfra} alt="logo" height="35px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <p className="mt-3 letra-branca">
                UFRA - UNIVERSIDADE FEDERAL RURAL DA AMAZÔNIA
              </p>
            </Nav>
            <Nav>
              {this.props.usuario.nome ?(
                
                <NavDropdown className="button-out" title={this.props.usuario.nome}>
                  <NavDropdown.Item 
                    onClick={() => {
                      this.props.logout();
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Sair
                  </NavDropdown.Item>
                </NavDropdown>
              ): null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default MenuTop;
