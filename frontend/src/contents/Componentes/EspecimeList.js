import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import Datatable from "../funcoes/Datatable";
import EspecimeForm from "./EspecimeForm";
class EspecimeList extends React.Component {
  render() {
    return(
      <>
        <h3 className="teste mt-2">
          <FontAwesomeIcon icon={faDog} /> Lista de Taxonomias
        </h3>
        <hr />
        <Datatable
          url={"http://localhost:8080/especime"}
          usuario={this.props.usuario}
          token={this.props.usuario.token}
          FormComponent={EspecimeForm}
        />
      </>
    )
  }
}

export default EspecimeList;
