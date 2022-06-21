import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DenominacaoForm from "./DenominacaoForm";
import React from "react";
import Datatable from "../funcoes/Datatable";
class DenominaçãoList extends React.Component {
  render() {
    return (
      <>
        <h3 className="letra-branca mt-2">
          <FontAwesomeIcon icon={faPaw} /> Lista de Denominações
        </h3>
        <hr />
        <Datatable
          url={"http://localhost:8080/denominacao"}
          usuario={this.props.usuario}
          token={this.props.usuario.token}
          FormComponent={DenominacaoForm}
        />
      </>
    );
  }
}

export default DenominaçãoList;
