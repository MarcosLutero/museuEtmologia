import { faClock, faIdCard, faKey, faSignOutAlt, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logoSegup from '../img/segup.png';
import MenuLeft from "./MenuLeft";

class MenuTop extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mb-3">
                <Navbar.Brand role="button" as="span" onClick={() => this.props.usuario? this.props.setContent("DashboardPage", true, 'Painel de Módulos') : null}><img src={logoSegup} alt="logo" height="35px"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {this.props.titulo}
                    </Nav>
                    {this.props.menus.length > 0?                         
                    <div className="d-block d-lg-none mt-2">
                        <MenuLeft menus={this.props.menus} onSelect={ menu => this.props.setContent(menu.conteudo)}/>           
                    </div>
                    : null}
                    {this.props.usuario?
                    <Nav>
                        <NavDropdown title={this.props.usuario.nome + ' - ' +this.props.usuario.Orgao.sigla}>
                            <NavDropdown.Item as='span' role="button" onClick={() => this.props.setContent("DashboardPage", true)}><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as='span' role="button" onClick={() => this.props.setContent("MyProfilePage", true)}><FontAwesomeIcon icon={faIdCard} /> Meus Dados</NavDropdown.Item>
                            <NavDropdown.Item as='span' role="button" onClick={() => this.props.setContent("MyReportPage", true)}><FontAwesomeIcon icon={faClock} /> Relatório de Acesso</NavDropdown.Item>
                            <NavDropdown.Item as='span' role="button" onClick={() => this.props.setContent("ChangePasswordPage", true)}><FontAwesomeIcon icon={faKey} /> Trocar Senha</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item  a='span' role="button" onClick={() => this.props.logout()}><FontAwesomeIcon icon={faSignOutAlt} /> Efetuar Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    : null}
                </Navbar.Collapse>                
            </Navbar>
        );
    }
}

export default MenuTop;
