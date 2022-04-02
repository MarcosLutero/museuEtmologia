import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import {actions} from '../../store';
import Datatable from '../Datatable';
import Request from '../../request';

class ModelList extends React.Component {

    onAction(action, update){
        if (this.props.onAction) this.props.onAction(action, update);
        else {
            const url = `${this.props.url}/${action.id}`;
            switch (action.name){
                case 'edit':
                    Request('GET', url)
                    .end( (err, res) => {
                        if (!err) {
                            const Form = this.props.modelForm? this.props.modelForm : "div";
                            const props = {
                                [this.props.modelName]: res.body,
                                onSave: () => update()
                            };
                            this.props.openModal({
                                titulo: `Editar Registro`,
                                conteudo: <Form {...props}/>
                            });
                        } else {
                            this.props.addToast({titulo: "Erro", conteudo: "Falha na recuperação do registro."});
                        }
                    });
                    break;
                case 'delete':
                    if (window.confirm(`Deseja realmente excluir o registro com id ${action.id}?`)){
                        Request('DELETE', url)
                        .end( (err, res) => {
                            if (!err && res.status === 200) {
                                this.props.addToast({titulo: "Successo", conteudo: "Registro excluído com sucesso."});
                                update();
                            } else {
                                this.props.addToast({titulo: "Erro", conteudo: "Falha na exclusão do registro."});
                            }
                        });
                    }
                    break;
                default:
                    break;                
            }
        }
    }

    render(){
        const EmptyForm = this.props.modelForm? this.props.modelForm : "div";
        const emptyProps = {
            [this.props.modelName]: this.props.empty !== undefined ? this.props.empty : {}
        };
        return (
            <Row>
                <Col>
                    <h3 className="mb-3 d-flex justify-content-between">
                        <div>
                            {this.props.modelIcon?
                            <FontAwesomeIcon icon={Icons[this.props.modelIcon]} />
                            : null} {this.props.title}</div>
                    </h3>
                    <Datatable 
                        url={this.props.url}
                        autosearch={true}
                        useAdd={this.props.useAdd}
                        token={this.props.token}
                        onError={(err) => this.props.addToast({titulo: "Erro", conteudo: err.toString()})}
                        onAction={(action, update) => this.onAction(action, update)}
                        onClickAdd={ update => this.props.openModal({titulo: 'Adicionar', conteudo: <EmptyForm {...emptyProps} onSave={() => update()}/>})}
                    />
                </Col>
            </Row>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    openModal: (modal) => dispatch({ type: actions.openModal, modal: modal }),
    addToast: (toast) => dispatch({ type: actions.addToast, toast: toast })
});

export default connect(null, mapDispatchToProps)(ModelList);