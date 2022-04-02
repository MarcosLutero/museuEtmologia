import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {actions} from '../../store';

class DashboardPage extends React.Component {

    componentDidMount(){
        this.props.setTitle('Painel de Módulos');
    }

    render(){
        const modulos = this.props.modulos.map( (modulo, key) => {
            
            const imagem = modulo.imagem? 
                <Card.Img variant="top" src={modulo.imagem}  className="p-2"/>
            : null;

            return (                
                <Col lg={3} key={key} className="d-flex my-3">
                    <Card className="align-self-stretch w-100">                        
                        <Card.Header>
                            <Card.Title>{modulo.titulo}</Card.Title>
                        </Card.Header>
                        {imagem}
                        <Card.Body>
                            <Card.Text>
                                {modulo.descricao}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                variant="primary"
                                className="form-control"
                                onClick={() => this.props.setModule(modulo.nome)}>
                                <FontAwesomeIcon icon={faSignInAlt} />&nbsp;
                                Acessar o módulo
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            );
        });
        return <Row>{modulos}</Row>;
    }
}

const mapStateToProps = (state) => ({
    modulos: state.usuario.Modulos
});

const mapDispatchToProps = dispatch => ({
    setTitle: (titulo) => dispatch({type: actions.setTitle, titulo: titulo}),
    setModule: (nome) => dispatch({ type: actions.setModule, nome: nome})
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);