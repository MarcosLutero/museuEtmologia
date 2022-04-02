import React from "react";

class Viewer extends React.Component {

    render(){
        return <object data={this.props.data} type={this.props.type} style={{width: "100%", minHeight: "600px"}}>
            Sem suporte a este tipo de objeto
        </object>;
    }
}

export default Viewer;