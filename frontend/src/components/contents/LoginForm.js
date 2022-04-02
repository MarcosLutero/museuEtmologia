import { faKey, faSignInAlt, faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Card, FormControl, InputGroup, Row, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import Request from '../../request';
import { connect } from "react-redux";
import { actions } from "../../store/index.js";
import ProcuraSenhaForm from "./ForgotPasswordForm.js";

class LoginForm extends React.Component {

    state = {
        captchaOk: false,
        loading: false,
    }

    constructor(){
        super();
        this.loginRef = React.createRef();
        this.senhaRef = React.createRef();
        this.recaptchaRef = React.createRef();
    }

    doLogin(){        

        const payload = {
            'login': this.loginRef.current.value,
            'senha': this.senhaRef.current.value,
            'g-recaptcha-response': this.props.config.USE_RECAPTCHA? this.recaptchaRef.current.getValue() : undefined
        };
        
        Request('POST', this.props.config.BACKEND_URL + '/login')
            .send(payload)
            .end((err, res) => {
                this.setState(state => ({loading: false}));
                if (!err){
                    this.props.setToken(res.body.token);
                    this.props.addToast({
                        titulo: "Bem Vindo!",
                        conteudo: "Logado com sucesso."
                    });
                } else {
                    var titulo, conteudo;
                    if (res){
                        switch (res.status){
                            case 401:
                                titulo = 'Login não autorizado';
                                conteudo = 'Usuário bloqueado pela administração';
                                break;
                            case 404:                             
                                titulo = 'Falha no Login';
                                conteudo = 'Usuário e senha não conferem.';
                                break;
                            default:
                                titulo = 'Falha na comunicação com o servidor';
                                conteudo = res.text;
                                break;
                        }
                    } else {
                        titulo = 'Falha na comunicação com o servidor';
                        conteudo = err.toString();
                    }

                    this.props.addToast({titulo, conteudo});
                }
            });        
    }

    executeRecaptcha(event){
        event.preventDefault();
        this.setState(state => ({loading: true}));
        if (this.props.config.USE_RECAPTCHA){
            this.recaptchaRef.current.reset();
            this.recaptchaRef.current.execute();
        } else {
            this.doLogin();
        }
        return false;
    }

    componentDidMount(){
        Request('GET', this.props.config.CONFIGURE_URL)
        .end( (err, res) => {
            if (!err) this.props.setConfig(res.body);
        });
    }

    render(){

        const recaptcha = this.props.config.USE_RECAPTCHA?
            <ReCAPTCHA
                onChange={() => this.doLogin()}
                onErrored={() => this.setState(state => ({loading: false}))}
                onExpired={() => this.setState(state => ({loading: false}))}
                sitekey={this.props.config.RECAPTCHA_SITE_KEY}
                size="invisible"
                badge="bottomleft"
                ref={this.recaptchaRef}                                    
            />
        : null;

        return (
            <Row className="my-5">
                <Col lg={{span: 4, offset: 4}}>
                <Card>
                    <Card.Header>
                        <Card.Title as="span">
                            Acesso ao Sistema
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={(event) => this.executeRecaptcha(event)}>
                            {recaptcha}
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Usuário</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl                                    
                                            type="text"
                                            name="login"
                                            ref={this.loginRef}
                                            required
                                            placeholder="Usuário"
                                            aria-label="Usuário"
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Senha</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faKey} /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            type="password"
                                            name="senha"
                                            ref={this.senhaRef}
                                            required
                                            placeholder="Senha"
                                            aria-label="Senha"
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>                    
                            <Row className="">
                                <Col>
                                    <Button
                                        variant="primary"
                                        className="form-control"
                                        type="submit"                                    
                                        disabled={this.state.loading}
                                    >
                                        {this.state.loading?
                                            <FontAwesomeIcon icon={faClock} />
                                        :   <FontAwesomeIcon icon={faSignInAlt}/>
                                        } Entrar
                                    </Button>
                                </Col>
                            </Row>                        
                        </form>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col className="text-center">
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={() => this.props.openModal({titulo: "Primeiro Acesso", conteudo: <ProcuraSenhaForm />})}>Primeiro acesso?</Button>
                            </Col>
                            <Col className="text-center">
                                <Button type="button" variant="link" onClick={() => this.props.openModal({titulo: "Recuperação de Senha", conteudo: <ProcuraSenhaForm />})}>Esqueceu a senha?</Button>
                            </Col>                    
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    config: state.config
});

const mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch({ type: actions.setToken, token }),
    setConfig: (config) => dispatch({ type: actions.setConfig, config }),
    addToast: (toast) => dispatch({ type: actions.addToast, toast }),
    openModal: (modal) => dispatch({ type: actions.openModal, modal })
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);