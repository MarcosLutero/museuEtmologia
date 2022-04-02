import React from 'react';
import { Col, Row } from 'react-bootstrap';

class NotFoundPage extends React.Component {
    render(){
        return (
            <Row>
                <Col lg={{offset: 4, span: 4}}>
                    <h1 className="text-center">404</h1>
                    <hr />
                    <h3 className="text-center">
                        O conteúdo que você procura não foi encontrado nesta página.
                        Verifique o endereço e tente novamente.
                    </h3>
                </Col>
            </Row>
        );
    }
}

export default NotFoundPage;