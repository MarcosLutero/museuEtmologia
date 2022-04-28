import Datatable from "../funcoes/Datatable";
import React from "react";
import AtributoCaracteristicaForm from "./AtributoCaracteristicaForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndent } from "@fortawesome/free-solid-svg-icons";

class CaracteristicaList extends React.Component {
  render() {
    return (
      <>
        <h3 className="teste mt-2">
          <FontAwesomeIcon icon={faIndent} /> Lista de Características
        </h3>
        <hr />
        <Datatable
          url={"http://localhost:8080/atributoCaracteristica"}
          usuario={this.props.usuario}
          token={this.props.usuario.token}
          FormComponent={AtributoCaracteristicaForm}
        />
      </>
    );
  }
}

export default CaracteristicaList;
