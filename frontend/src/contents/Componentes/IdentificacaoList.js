import { faIndent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datatable from "../funcoes/Datatable";
import React from "react";
import axios from "axios";

class IdentificacaoList extends React.Component {
  onAction(action, id, callback) {
    switch (action) {
      case "Excluir":
        if (window.confirm("Deseja realmente excluir este registro?")) {
          const config = {
            headers: { Authorization: "Bearer " + this.props.usuario.token },
          };
          axios
            .delete(`http://localhost:8080/caracteristica/${id}`, config)
            .then((res) => {
              callback();
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;

      case "Editar":
        const config = {
          headers: { Authorization: "Bearer " + this.props.usuario.token },
        };
        axios
          .get(`http://localhost:8080/caracteristica/${id}`, config)
          .then((res) => {
            console.log("chamar modal")
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      default:
        break;
    }
    console.log(action, id);
    callback();
  }

  render() {
    return (
      <>
        <h3>
          <FontAwesomeIcon icon={faIndent} /> Lista de Identificações
        </h3>
        <hr />
        <Datatable
          url={"http://localhost:8080/caracteristica"}
          token={this.props.usuario.token}
          onAction={(action, id, callback) =>
            this.onAction(action, id, callback)
          }
        />
      </>
    );
  }
}

export default IdentificacaoList;