import Datatable from "../funcoes/Datatable";
import React from "react";
import IdentificacaoForm from "./IdentificacaoForm";


class IdentificacaoList extends React.Component {  
  render() {
    return (
      <>
        <hr />
        <Datatable
          url={"http://localhost:8080/caracteristica"}
          token={this.props.usuario.token}
          FormComponent = {IdentificacaoForm}
        />
      </>
    );
  }
}

export default IdentificacaoList;
