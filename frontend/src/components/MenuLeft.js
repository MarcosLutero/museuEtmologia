import * as Icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Accordion, AccordionCollapse, AccordionToggle, Card, ListGroup, ListGroupItem } from "react-bootstrap";

class MenuLeft extends React.Component {

    state = {
        eventKey: null
    }

    render() {
        
        const menus = this.props.menus? this.props.menus.map( (menu, key) => {
            const submenus = menu.Submenus? menu.Submenus.map( (submenu, key) =>{
                const icone = submenu.icone? <FontAwesomeIcon icon={Icons[submenu.icone]} /> : null;
                return (
                    <ListGroupItem role="button" onClick={() => this.props.onSelect(submenu)} key={key}>
                        {icone} {submenu.titulo}
                    </ListGroupItem>
                );
            } ) : null;
            const collapse = submenus?
                <AccordionCollapse eventKey={key+1}>
                    <div>
                        <ListGroup variant="flush">
                            {submenus}
                        </ListGroup>
                    </div>
                </AccordionCollapse>
            : null;

            const icone = menu.icone?
                <FontAwesomeIcon icon={Icons[menu.icone]} />
                : null;

            const chevron = submenus.length > 0?
                (key+1) === this.state.eventKey?
                    <div><FontAwesomeIcon icon={Icons.faChevronDown} /></div>:
                    <div><FontAwesomeIcon icon={Icons.faChevronRight} /></div>
                : null;
                
            return (
                <Card key={key}>
                    <AccordionToggle
                        role="button" 
                        as={Card.Header} 
                        eventKey={key+1}                     
                    >
                        <div
                            role="button"
                            className="d-flex justify-content-between"
                            onClick={menu.conteudo? () => this.props.onSelect(menu) : null}
                        >
                            <div>{icone} {menu.titulo}</div>
                            {chevron}
                        </div>
                    </AccordionToggle>
                    {collapse}
                </Card>
            );
        }) : null;

        return (            
            <Accordion as={Card} defaultActiveKey="1" className="mb-3">
                <AccordionToggle as={Card.Header} role="button" eventKey="1">
                    <span>
                        Menu Principal
                    </span>
                </AccordionToggle>
                <AccordionCollapse as={Card.Body} eventKey="1" className="m-3">
                    <Accordion onSelect={eventKey => this.setState(() => ({eventKey}))}>
                        {menus}    
                    </Accordion>
                </AccordionCollapse>           
            </Accordion>
        );
    }
}


export default MenuLeft;