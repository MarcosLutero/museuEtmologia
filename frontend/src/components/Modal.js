import React from "react";
import { Modal as BSModal } from "react-bootstrap";

class Modal extends React.Component {

    render(){
        return (
            <BSModal size={this.props.size ?? 'md'} show={this.props.show} onHide={() => this.props.closeModal? this.props.closeModal() : null}>
                <BSModal.Header closeButton>
                    <BSModal.Title>{this.props.titulo}</BSModal.Title>
                </BSModal.Header>
                <BSModal.Body>
                    {this.props.conteudo}
                </BSModal.Body>
            </BSModal>
        );
    }
}

export default Modal;