import { faBackward, faFastBackward, faFastForward, faForward } from "@fortawesome/free-solid-svg-icons";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, InputGroup, ListGroup, ListGroupItem, OverlayTrigger, Pagination, Popover, Table } from "react-bootstrap";
import Request from "superagent";

class Datatable extends React.Component {

    //props = {'url', 'method', 'token', 'autosearch', onError(err, res, action), onAction(action), onUpdate(rows)}

    timeout = null;

    state = {
        headers: [
            //{title: 'header', order: 'column'}, ...
        ],
        rows: [
            //{values: ['value',...], actions:[{'icon', 'title', 'variant'},...]}
        ],
        order: undefined,
        dir: undefined,
        filter: '',
        limit: 10,
        offset: 0,
        count: 0
    };


    componentDidMount(){
        this.update();
    }

    update(){

        if (this.props.url){
            
            var payload = {
                filter: this.state.filter,
                limit:  this.state.limit,
                offset: this.state.limit > 0? this.state.offset : 0,
                order:  this.state.order,
                dir:    this.state.dir
            };

            if (this.props.getQuery){
                payload = this.props.getQuery(payload);
            }               

            const headers = {
                Authorization: this.props.token? 'Bearer ' + this.props.token.toString() : undefined,
                Accept: 'json'
            }            
            
            if (this.props.getHeaders){
                this.props.getHeaders().each( (value, key) => {
                    headers[key] = value;
                });
            }

            Request
            .get(this.props.url)
            .query(payload)
            .set(headers)
            .end( (err, res) => {
                if (err && this.props.onError) { 
                    this.props.onError(err, res);
                } else if (!err){
                    const data = {
                        headers: res.body.headers,
                        rows: res.body.rows,
                        count: res.body.count
                    };
                    this.setState( () => data, () => {
                        if (this.props.onUpdate){
                            this.props.onUpdate(data);
                        }
                    });
                }
            });
        }

    }
    
    setOrder(order){

        const update = () => this.update();

        if (order === this.state.order){
            if (this.state.dir === 'ASC'){
                this.setState( () => ({dir: 'DESC'}), update);
            } else {
                this.setState( () => ({order: undefined, dir: undefined}), update);
            }
        } else {
            this.setState( () => ({order: order, dir: 'ASC'}), update);
        }

    }    

    setFilter(event){
        this.setState(() =>({filter: event.target.value}), () => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout( () => this.update(), 400);
        });
    }

    setPage(page){
        this.setState(state=>({offset: (page - 1) * state.limit}), () => this.update());
    }

    setLimit(limit){
        this.setState(() => ({limit: limit, offset: 0}), () => this.update());
    }

    onAction(action){
        if (this.props.onAction){
            this.props.onAction(action, () => this.update());
        }
    }

    onClickAdd(){
        if (this.props.onClickAdd) {
            this.props.onClickAdd(() => this.update());
        }
    }

    render(){

        const headers = this.state.headers? this.state.headers.map(
            (header, key0) => {
                const icon = this.state.order === header.order && header.order ? (
                    this.state.dir === 'ASC' ?
                        <FontAwesomeIcon icon={Icons.faSortAlphaDown} /> :
                        <FontAwesomeIcon icon={Icons.faSortAlphaUpAlt} />
                ) : null;
                return (
                    <th className="sticky bg-light" key={key0} role="button" onClick={() => this.setOrder(header.order)}>
                        {icon} {header.title}
                    </th>
                );
            }
        ) : [];   

        if (headers.length > 0) headers.push(
            <th className="sticky bg-light d-print-none" key={headers.length} style={{textAlign: 'center', width: '1%'}}>
                Ações
            </th>
        );        
                
        const rows = this.state.rows? [...this.state.rows]
        .map( (row, key1) => {            
            const actions = row.actions.length > 0? row.actions.map( (action, key2) => {
                const icon = action.icon? <FontAwesomeIcon icon={Icons[action.icon]} /> : action.title;
                return (
                    <Button
                        className="ml-1"
                        key={key2}
                        size="sm"
                        variant={action.variant}
                        title={action.title}
                        onClick={() => this.onAction(action)}>
                        {icon}
                    </Button>
                );
            }) : "Sem Ações";

            const cols = row.values? row.values.map(
                (value, key) => {
                    
                    if (Array.isArray(value)){

                        const popover = (
                            <Popover>
                                <Popover.Title as="h3">{this.state.headers[key].title}</Popover.Title>
                                <Popover.Content>
                                    <ListGroup variant="flush">{value.map( (label, key) => 
                                        <ListGroupItem key={key}>{label}</ListGroupItem>
                                    )}</ListGroup>
                                </Popover.Content>
                            </Popover>
                        );                       

                        return (
                            <td key={key}>
                                <OverlayTrigger trigger="focus" placement="bottom" overlay={ popover  }>
                                    <Button variant="outline-info" size="sm"><FontAwesomeIcon icon={Icons.faList} /></Button>
                                </OverlayTrigger>
                            </td>
                        );

                    } else {
                        return <td key={key}>{value}</td>;
                    }
                }
            ) : null;

            if (cols) cols.push(
                <td style={{whiteSpace: 'nowrap', textAlign: 'center'}} key={cols.length} className="d-print-none">
                    {actions}
                </td>
            );     

            return  <tr key={key1}>{cols}</tr>;

        }) : [];

        //const pages = allRows && this.state.limit ? parseInt((allRows.length-1)/ this.state.limit) + 1 : 1;
        const pages = this.state.count > 0 && this.state.limit > 0 ? parseInt((this.state.count - 1)/ this.state.limit) + 1 : 1;

        const page  = this.state.limit > 0? parseInt(this.state.offset / this.state.limit) + 1 : 1;

        const max = 5;
        const half = parseInt(max / 2);

        let start = page - half
        let end   = page + half;

        if (pages <= max){
            start = 1;
            end = pages;
        } else if (page <= half + 1) {
            start = 1;
            end = max;
        } else if ( end > pages ){            
            start = pages - max + 1;
            end = pages;
        }

        const buttons = [];
        
        for (let p = start; p <= end; p = p + 1){
            buttons.push(
                <Pagination.Item active={p === page} key={p-start} onClick={() => this.setPage(p)}>
                    {p}
                </Pagination.Item>
            );
        }
        
        const tools = 
            <tr className="d-print-none">
                <td colSpan={headers.length}>
                    <Form as="div" className="d-flex align-items-stretch flex-wrap">
                        {this.props.useAdd?
                        <div className="mr-2 my-2 flex-fill">
                            <Button size="sm" style={{width: '100%'}} variant='outline-success' onClick={() => this.onClickAdd()}>
                                <FontAwesomeIcon icon={Icons.faPlus} />&nbsp;Adicionar
                            </Button>
                        </div>
                        : null}
                        <div className="mr-2 my-2 flex-fill">                            
                            <InputGroup size="sm" style={{width: '100%'}}>                                
                                <InputGroup.Prepend >
                                    <InputGroup.Text variant="primary">
                                        <FontAwesomeIcon icon={Icons.faSearch} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Pesquisa"
                                    onChange={(event) => this.setFilter(event)}
                                    value={this.state.filter}
                                />
                            </InputGroup>  
                        </div>
                        <div className="small mr-2 my-2 d-flex align-items-center">
                            <div><strong>Total:</strong>&nbsp;{this.state.count ?? 0} registros.</div>
                        </div>
                        <div className="mr-2 my-2">
                            <Form.Control
                                size="sm"
                                value={this.state.limit} 
                                onChange={(event) => this.setLimit(event.target.value)}
                                as="select" 
                                custom
                                >
                                <option value={10}>10 registros</option>
                                <option value={20}>20 registros</option>
                                <option value={50}>50 registros</option>
                                <option value={100}>100 registros</option>
                                <option value={0}>Todos os registros</option>
                            </Form.Control>
                        </div>                                
                        <div>                              
                            <Pagination size="sm" className="my-2">
                                <Pagination.Item onClick={() => this.setPage(1)} disabled={page === 1}>
                                    <FontAwesomeIcon icon={faFastBackward} />
                                </Pagination.Item>
                                <Pagination.Item onClick={() => this.setPage(page-1)} disabled={page === 1}>
                                    <FontAwesomeIcon icon={faBackward} />
                                </Pagination.Item>
                                {buttons}
                                <Pagination.Item onClick={() => this.setPage(page+1)} disabled={page === pages}>
                                    <FontAwesomeIcon icon={faForward} />
                                </Pagination.Item>
                                <Pagination.Item onClick={() => this.setPage(pages)} disabled={page === pages}>
                                    <FontAwesomeIcon icon={faFastForward} />
                                </Pagination.Item>
                            </Pagination>
                        </div>
                    </Form>                                                        
                </td>
            </tr>
        ;

        const body = rows.length > 0? rows :
            <tr>
                <td colSpan={headers.length} className="text-center my-5">
                    <strong>Nenhum registro encontrado</strong>
                </td>            
            </tr>
        ;

        return  (
            <Table className="sticky" size="sm" hover>                                              
                <thead>
                    {tools}
                    <tr className="bg-light">{headers}</tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>
        );
    }
}

export default Datatable;