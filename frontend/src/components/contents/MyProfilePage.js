import React from 'react';
import { Col, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem, Nav, Row, Tab, TabContainer, TabContent, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import {actions} from '../../store';

class MyProfilePage extends React.Component {
    render(){

        const links = this.props.usuario.Modulos.map( (modulo, key) => {
            return (
                <Nav.Item key={key}>
                    <Nav.Link eventKey={modulo.nome}>
                        {modulo.titulo}
                    </Nav.Link>
                </Nav.Item>
            );
        });

        const panes = this.props.usuario.Modulos.map( (modulo, key) => {            
            return (
                <Tab.Pane key={key} eventKey={modulo.nome}>
                    <FormGroup>
                        <strong>Descrição do Módulo</strong>
                        <FormControl readonly value={modulo.descricao} />
                    </FormGroup>
                    <FormGroup>
                        <strong>Perfis Associados</strong>
                        <FormControl readonly value={modulo.Perfis.map(p => p.nome).join(", ")} />
                    </FormGroup>
                </Tab.Pane>
            );
        });

        const permissoes = this.props.usuario.Permissoes.map( (permissao, key) => 
            <ListGroupItem key={key}>
                <strong>{permissao.nome}</strong><br />
                <em>{permissao.descricao}</em>
            </ListGroupItem>
        );

        const risps = this.props.usuario.Risps.map( (risp, key) => 
            <ListGroupItem key={key}>
                <strong>{risp.nome}</strong><br />
            </ListGroupItem>
        );

        return (
            <div>                
                <h2>{this.props.usuario.nome} - {this.props.usuario.Orgao.sigla}</h2>
                <Tabs defaultActiveKey="usuario">
                    <Tab eventKey="usuario" title="Dados do Usuário">
                        <Row className="my-3">
                            <Col lg={{span: 6, offset: 3}}>
                                <FormGroup>
                                    <FormLabel>Login</FormLabel>
                                    <FormControl readonly value={this.props.usuario.login} />
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl readonly value={this.props.usuario.nome} />
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl readonly value={this.props.usuario.email} />
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Órgão</FormLabel>
                                    <FormControl readonly value={this.props.usuario.Orgao.nome} />
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Setor</FormLabel>
                                    <FormControl readonly value={this.props.usuario.Setor ? this.props.usuario.Setor.nome : "Sem setor definido"} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="modulos" title="Módulos e Perfis">
                        <TabContainer>
                            <Row className="my-3">
                                <Col lg={3}>
                                    <h4>Módulos</h4>
                                    <Nav variant="pills" className="flex-column">
                                        {links}
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <TabContent>
                                        {panes}
                                    </TabContent>
                                </Col>
                            </Row>
                        </TabContainer>
                    </Tab>
                    <Tab eventKey="permissoes" title="Permissões">
                        <Row className="my-3">
                            <Col lg={{span: 6, offset: 3}}>
                                <ListGroup>
                                    {permissoes}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="risps" title="RISPs">
                        <Row className="my-3">
                            <Col lg={{span: 6, offset: 3}}>
                                <ListGroup>
                                    {risps}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({    
   usuario: state.usuario 
});

const mapDispatchToProps = dispatch => ({
    setContent: (content) => dispatch({ type: actions.setContent, content }),
    setToken: (token) => dispatch({ type: actions.setToken, token }),
    addToast: (toast) => dispatch({ type: actions.addToast, toast })
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);