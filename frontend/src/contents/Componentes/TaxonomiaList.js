import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaxonomiaForm from "./TaxonomiaForm";
import React from "react";
import Datatable from "../funcoes/Datatable";
class TaxonomiaList extends React.Component {
  render() {
    return(
      <>
        <h3 className="mt-2 letra-branca">
          <FontAwesomeIcon icon={faClipboardList} /> Lista de Taxonomias
        </h3>
        <hr />
        <Datatable
          url={"http://localhost:8080/taxonomia"}
          usuario={this.props.usuario}
          token={this.props.usuario.token}
          FormComponent={TaxonomiaForm}
        />
      </>
    )
  }
}

export default TaxonomiaList;
