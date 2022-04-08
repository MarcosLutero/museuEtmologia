import React from "react";
import {Toast as BSToast} from 'react-bootstrap';

class Toast extends React.Component {
    
    state = {
        show: true
    };

    close(){
        this.setState(state => ({show: false}));
        this.props.delToast(this.props.toastKey);
    }

    render(){
        return (
            <BSToast onClose={() => this.close()} show={this.state.show} delay={this.props.delay? this.props.delay : 4000} autohide>
                <BSToast.Header>
                    <strong className="mr-auto">{this.props.titulo}</strong>
                </BSToast.Header>
                <BSToast.Body>{this.props.conteudo}</BSToast.Body>
            </BSToast>
        );
    }
}

export default Toast;