import axios from "axios";
import React from "react";
import { Button, FormControl, Table } from "react-bootstrap";


class Datatable extends React.Component {

  state = {
    data: {
      headers:[],
      rows: []
    },
    filter: ""
  }
  
  componentDidMount() {
    this.update();
  }

  update(){
    const config = {
      headers: {Authorization: 'Bearer '+this.props.token}
    }
    axios.get(this.props.url, config).then(response => {
      this.setState(() =>({data: response.data}))
     });
  }

  render() {
    return (
      <Table responsive condensed striped class>
        <thead>
          <tr>
            <td colSpan={this.state.data.headers.length+1}>
              <FormControl value={this.state.filter} onChange={event => this.setState( () => ({filter: event.target.value}))}/>
            </td>
          </tr>
          <tr>
            {this.state.data.headers.map((header,key)=>
            <th key={key}>{header}</th>
            )}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.rows.filter(row => row.columns.some(column => column.includes(this.state.filter))).slice().map( (row, key) =>
          <tr key={key}>
            {row.columns.map((column,key)=>
            <td key={key}>{column}</td>
            )}
            <td>
              {row.actions.map((action, key) => 
              <Button size='sm' key={key} variant='outline-primary' onClick={() => this.props.onAction(action, row.id, () => this.update())}>{action}</Button>
              )}
            </td>
          </tr>)}
        </tbody>
      </Table>
    )
  }
}

export default Datatable;
