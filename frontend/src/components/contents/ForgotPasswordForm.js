import { faClock, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import Request from 'superagent';
import { connect } from "react-redux";
import { actions } from "../../store/index.js";
import { Formik, Form, ErrorMessage, Field } from "formik";

class ForgotPasswordForm extends React.Component {

    constructor(props){
        super(props);
        this.recaptchaRef = React.createRef();
    }

    submit(values, callback){
        Request.post(this.props.config.BACKEND_URL + '/login/procurar')
        .send(values)
        .then(res => {                                          
            this.props.addToast({
                titulo: "Recuperação de Senha",
                conteudo: "Se os seus dados estiverem corretos, você receberá um email com o link para criamção de uma nova senha. Verifique sua caixa de entrada e de spam.",
                delay: 10000
            });
            this.props.closeModal();
            callback();
        })
        .catch(err => {
            this.props.addToast({
                titulo: "Falha na recuperação de senha",
                conteudo: "Ocorreu um erro ao tentar recuperar sua senha: " + err.toString(),
                delay: 10000
            }); 
            callback();
        });        
    }

    executeRecaptcha(values, callback){

        if (this.props.config.USE_RECAPTCHA){
            this.recaptchaRef.current.reset();
            
            this.recaptchaRef.current.executeAsync()
            .then(response => {
                values['g-recaptcha-response'] = response;
                this.submit(values, callback);
            })
            .catch(err => {
                this.props.addToast({
                    titulo: "Falha na recuperação de senha",
                    conteudo: "Ocorreu um erro ao tentar recuperar sua senha: " + err.toString(),
                    delay: 10000
                }); 
                callback();
            });
        } else {
            this.submit(values, callback);
        }               
    }

    render(){
        return (
            <Formik
                initialValues={{ 
                    login: '',
                    email: '',
                    url: this.props.config.FRONTEND_URL + '/recuperar'
                }}
                validate={ values => {     
                    const errors = {};     
                    
                    if (!values.login) {    
                        errors.login = 'Campo obrigatório.';     
                    }
                    if (!values.email) {    
                        errors.email = 'Campo obrigatório.';     
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
                        errors.email = 'Endereço de email inválido';     
                    }

                    return errors;     
                }}
                onSubmit={(values, { setSubmitting }) => this.executeRecaptcha(values, () => setSubmitting(false))}     
            >     
                {({ isSubmitting }) => (
                    <Form>
                    {this.props.config.USE_RECAPTCHA?
                        <ReCAPTCHA
                            sitekey={this.props.config.RECAPTCHA_SITE_KEY}
                            size="invisible"
                            badge="bottomleft"
                            ref={this.recaptchaRef}                                    
                        />
                        : null
                    }
                    <Row className="mb-3">
                        <Col className="text-justify">
                            Preencha o seu CPF (somente números) e seu email para realizar a
                            recuperação de sua senha ou o primeiro acesso. Caso ainda não possua
                            cadastro no PISP, procure o ponto focal de sua instituição.
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <strong>CPF</strong>
                            <ErrorMessage name="login" component="span" className="text-danger small ml-2" />
                            <Field                                    
                                type="text"
                                name="login"
                                className="form-control"
                                placeholder="Digite seu CPF (somente números)"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <strong>Email</strong>
                            <ErrorMessage name="email" component="span" className="text-danger small ml-2" />
                            <Field                                    
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Digite seu email"                                
                            />
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
                                :   <FontAwesomeIcon icon={faMailBulk}/>
                                } Enviar
                            </Button>
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
    closeModal: () => dispatch({ type: actions.closeModal})
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);