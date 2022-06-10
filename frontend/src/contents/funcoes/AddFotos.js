import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { Base64 } from "js-base64";

class AddFotos extends Component {
  uploadRef = React.createRef();

  state = {
    loading: false,
    progress: 0,
  };

  loadFiles(files) {
    const total = Array.from(files).reduce((sum, file) => sum + file.size, 0);
    var uploaded = 0;

    this.setState(() => ({ loading: true, progress: 0 }));

    Promise.all(
      Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            resolve({
              id: null,
              nome: file.name,
              conteudo: this.props.asDataURL
                ? reader.result
                : Base64.btoa(reader.result),
            });
          };

          var atual = 0;
          reader.onprogress = ({ loaded }) => {
            uploaded += loaded - atual;
            this.setState(() => ({
              progress: parseInt((uploaded / total) * 100),
            }));
            atual = loaded;
          };

          reader.onerror = () => reject(file);

          if (this.props.asDataURL) reader.readAsDataURL(file);
          else reader.readAsBinaryString(file);
        });
      })
    )
      .then((anexos) => (this.props.onLoad ? this.props.onLoad(anexos) : null))
      .catch((file) => (this.props.onError ? this.props.onError(file) : null))
      .finally(() => this.setState(() => ({ loading: false })));
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <ProgressBar className="mt-3" animated now={this.state.progress} />
        ) : (
          <Button
            type="button"
            className="form-control"
            variant="success"
            onClick={() => this.uploadRef.current.click()}
          >
            <FontAwesomeIcon icon={this.props.icon ?? faPlus} />{" "}
            {this.props.title ?? "Adicionar Anexo"}
          </Button>
        )}
        <input
          type="file"
          className="d-none"
          ref={this.uploadRef}
          multiple={true}
          onChange={(event) =>
            this.props.onLoad || this.props.onError
              ? this.loadFiles(event.target.files, (files) =>
                  this.props.onLoad(files)
                )
              : null
          }
        />
      </div>
    );
  }
}

export default AddFotos;
