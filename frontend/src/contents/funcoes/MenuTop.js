import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import LogoUfra from "../../img/LogoUfra.png";

class MenuTop extends React.Component {
  render() {
    return (
      <div className="total">
        <Navbar collapseOnSelect className="bg-success navbar navbar-expand-lg">
          <Navbar.Brand role="button" as="span">
            <img src={LogoUfra} alt="logo" height="35px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <p className="mt-3 text-white">
                UFRA - UNIVERSIDADE FEDERAL RURAL DA AMAZÔNIA
              </p>
            </Nav>
            <Nav>
              {this.props.usuario.nome ?(
                <NavDropdown className="button-out" title={this.props.usuario.nome}>
                  <NavDropdown.Item //PROBLEMA TA AQUI
                    
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

      </div>
    );
  }
}

export default MenuTop;
