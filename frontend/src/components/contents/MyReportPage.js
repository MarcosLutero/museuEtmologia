import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import {actions} from '../../store';
import Datatable from '../Datatable';
import Request from '../../request';
import AcessoForm from './admin/AcessoForm';

class AcessoList extends React.Component {

    onAction(action){
        const url = this.props.config.BACKEND_URL + '/usuario/acesso/' + action.id;
        switch (action.name){
            case 'view':
                Request('GET', url)
                .end( (err, res) => {
                    if (!err) {
                        this.props.openModal({
                            titulo: "Visualizar Acesso",
                            conteudo: <AcessoForm acesso={res.body}/>
                        });
                    } else {
                        this.props.addToast({titulo: "Erro", conteudo: "Falha na recuperação do registro."});
                    }
                });
                break;
            default:
                break;                
        }
    }

    render(){
        return (
            <Row>
                <Col>
                    <h3 className="mb-3 d-flex justify-content-between">
                        <div><FontAwesomeIcon icon={faClock} /> Lista de Acessos</div>
                    </h3>
                    <Datatable 
                        url={this.props.config.BACKEND_URL + '/usuario/acesso'}
                        autosearch={true}
                        useAdd={false}
                        token={this.props.token}
                        onError={(err) => this.props.addToast({titulo: "Erro", conteudo: err.toString()})}
                        onAction={(action) => this.onAction(action)}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token,
    usuario: state.usuario,
    config: state.config
});

const mapDispatchToProps = dispatch => ({
    openModal: (modal) => dispatch({ type: actions.openModal, modal: modal }),
    addToast: (toast) => dispatch({ type: actions.addToast, toast: toast })
});

export default connect(mapStateToProps, mapDispatchToProps)(AcessoList);