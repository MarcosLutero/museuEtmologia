import React from "react";
import { FormControl } from "react-bootstrap";
import "./css/index.scss";

class PaginaInicial extends React.Component {
  render() {
    return (
      <>
        <div className="paginaInicial">
          <div className="pesquisar">
            <form>
              <FormControl
                type="text"
                name="inseto"
                required
                placeholder="Nome do Inseto"
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default PaginaInicial;
