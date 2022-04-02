import React from "react";
import { Button, Col, FormGroup, Row } from "react-bootstrap";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Request from '../../request';
import { connect } from "react-redux";
import { actions } from "../../store/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faKey } from "@fortawesome/free-solid-svg-icons";

class RecoverPasswordForm extends React.Component {

    submit(values, callback){        

        Request('post', this.props.config.BACKEND_URL + '/login/recuperar')
        .send(values)
        .then( res => {
            alert("Senha alterada com sucesso. Você será redirecionado para a página de login.");            
            window.location = this.props.config.FRONTEND_URL;                                          
            callback();
        })
        .catch(err => {
            this.props.addToast({
                titulo: "Falha ao alterar senha",
                conteudo: "Houve um erro ao alterar a senha: " + err.toString(),
                delay: 10000
            });
            callback();
        });        
    }

    render(){

        return (
            <Formik
                initialValues={{ 
                    senha1: '',
                    senha2: '',
                    id: this.props.match.params.id,
                    token: this.props.match.params.token
                }}
                validate={values => {     
                    const errors = {};     
                    if (!values.senha1) {    
                        errors.senha1 = 'Campo obrigatório.';     
                    }                    
                    if (values.senha1.length < 8){
                        errors.senha1 = 'A senha deve ter no mínimo 8 caracteres.';
                    }
                    if ( !/[A-Z]/.test(values.senha1)){
                        errors.senha1 = 'A senha deve ter no mínimo 1 letra maiúscula.';
                    }
                    if ( !/[a-z]/.test(values.senha1)){
                        errors.senha1 = 'A senha deve ter no mínimo 1 letra minúscula.';
                    }
                    if ( !/\d/.test(values.senha1)){
                        errors.senha1 = 'A senha deve ter no mínimo 1 algarismo.';
                    }
                    if (values.senha1 !== values.senha2){
                        errors.senha2 = 'As senhas devem ser iguais.';
                    }
                    return errors;     
                }}
                onSubmit={(values, { setSubmitting }) => {     
                    this.submit(values, () => setSubmitting(false));
                }}     
            >     
                {({ isSubmitting }) => (
                    <Form>
                        <Row>
                            <Col lg={{span: 4, offset: 4}}>
                                <Row className="mb-3">
                                    <Col>
                                        <h3 className="text-center">Recuperação de Senha</h3>
                                        <hr />
                                        <p className="text-justify">
                                            Insira a sua nova senha abaixo. A senha deve conter no mínimo 8 caracteres, contendo ao menos 1 letra maiúscula, 1 letra minúscula e 1 algarismo.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <FormGroup>
                                        <strong>Nova senha</strong><ErrorMessage name="senha1" component="span" className="text-danger small ml-2"/>
                                        <Field                                   
                                            type="password"
                                            name="senha1"
                                            className="form-control"
                                        />     
                                        </FormGroup>                   
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <FormGroup>
                                        <strong>Repita a nova senha</strong><ErrorMessage name="senha2" component="span" className="text-danger small ml-2"/>
                                        <Field                                   
                                            type="password"
                                            name="senha2"
                                            className="form-control"
                                        />         
                                        </FormGroup>               
                                    </Col>
                                </Row>                  
                                <Row className="mb-3">
                                    <Col>
                                        <Button
                                            variant="primary"
                                            className="form-control"
                                            type="submit"                                    
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting?
                                                <FontAwesomeIcon icon={faClock} />
                                            :   <FontAwesomeIcon icon={faKey}/>
                                            } Alterar Senha
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>                       
                    </Form>
                )}
            </Formik>
        );
    }
}

const mapStateToProps = state => ({
    config: state.config
});

const mapDispatchToProps = dispatch => ({
    addToast: (toast) => dispatch({ type: actions.addToast, toast }),
    openModal: (modal) => dispatch({ type: actions.openModal, modal }),
    closeModal: () => dispatch({ type: actions.closeModal})
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordForm);