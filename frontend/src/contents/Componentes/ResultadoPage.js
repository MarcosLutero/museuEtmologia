import React from "react";

class ResultadoPage extends React.Component {
  render() {
    return (
      <div>
        {" "}
        <div>
          {this.props.resultados
            .filter((resultado) => resultado.nome?.includes(this.state.filter))
            .map((result) => result.nome)}
        </div>
      </div>
    );
  }
}

export default ResultadoPage;
