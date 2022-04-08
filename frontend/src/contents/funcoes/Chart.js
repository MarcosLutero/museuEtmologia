import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    BarElement,
    PointElement,
    LineElement,    
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelDownAlt, faBars, faChartArea} from '@fortawesome/free-solid-svg-icons';


ChartJS.register(    
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,    
    ArcElement,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

class Chart extends React.Component {


    Types = {
        Bar,
        VerticalBar: Bar,
        Pie,
        Line,
        Radar
    }

    state = {
        type: this.props.type ?? 0,
        stacked: false,
        transpor: false,
        colors: [
            `rgba(0,0,0,0.5)`
        ]
    }

    colorIndex = 0;

    componentDidMount(){
        const isMulti = this.props.data.length > 0 && Array.isArray(this.props.data[0].total);
        const length = Math.max(this.props.data.length, isMulti? this.props.data[0].total.length : 0);
        
        const randomColor = () => {
            var h = Math.floor(Math.random() * 30) * 6;
            return `hsla(${h}, 60%, 60%, 90%)`;
        };

        const colors = [];
        for (var i = 0; i < length; i++){
            colors.push(randomColor());
        }

        this.setState(() => ({colors}));        
    }

    getColor = () => {
        const colors = this.state.colors;
        return colors[this.colorIndex++ % colors.length];
    }

    render() {

        this.colorIndex = 0;

        const types = Object.keys(this.Types);
        const Type = this.Types[types[this.state.type % types.length]];
        const isPie = types[this.state.type % types.length] === "Pie" ;

        const options = {
            fill: true,               
            responsive: true,
            indexAxis: types[this.state.type % types.length] === "VerticalBar" ? 'y' : 'x',
            scales: {                
                x: { 
                    stacked: this.state.stacked,
                    display: types[this.state.type % types.length] !== "Pie" && types[this.state.type % types.length] !== "Radar",
                    suggestedMin: 0
                },
                y: { 
                    stacked: this.state.stacked,
                    display: types[this.state.type % types.length] !== "Pie" && types[this.state.type % types.length] !== "Radar",
                    suggestedMin: 0
                }
            }           
        };

        const isMulti = this.props.data.length > 0 && Array.isArray(this.props.data[0].total);

        const data = this.state.transpor && isMulti ?
            this.props.data[0].total.map(({label}) => ({
                label,
                total: this.props.data.map(data => ({
                    label: data.label,
                    total: data.total.find(total => total.label === label).total
                }))
            }))
            : this.props.data;


        const labels = data.map(data => data.label);

        var datasets = [];

        if (isPie){
            datasets = [isMulti ? {
                label: 'Total',
                data: data.map(item => item.total.reduce( (sum, total) => sum + total.total, 0)),
                backgroundColor: data.map(() => this.getColor())
            } : {
                label: 'Total',
                data: data.map(item => item.total),
                backgroundColor: data.map(() => this.getColor())
            }]
        } else {
            datasets = isMulti ? data[0].total.map(dataset => {
                return {
                    label: dataset.label,
                    data: data.map(item => item.total.find(total => total.label === dataset.label).total),
                    backgroundColor: this.getColor()
                };
            }) : [{
                label: 'Total',
                data: data.map(item => item.total),
                backgroundColor: this.getColor()
            }];
        }

        return <div>
            <Type options={{ ...options, ...this.props.options }} data={{ labels, datasets }} />
            <Row className='d-print-none'>
                <Col className='d-flex justify-content-between'>
                    <Button className='mx-1 flex-grow-1' onClick={() => this.setState(state => ({stacked: !state.stacked}))}>
                        <FontAwesomeIcon icon={faBars} /> <span className="d-none d-lg-inline">Empilhar</span>
                    </Button>
                    <Button className='mx-1 flex-grow-1' onClick={() => this.setState(state => ({type: state.type + 1}))}>
                        <FontAwesomeIcon icon={faChartArea} /> <span className="d-none d-lg-inline">Tipo</span>
                    </Button>
                    <Button className='mx-1 flex-grow-1' onClick={() => this.setState(state => ({transpor: !state.transpor}))}>
                        <FontAwesomeIcon icon={faLevelDownAlt} /> <span className="d-none d-lg-inline">Transpor</span>
                    </Button>
                </Col>
            </Row>
            
        </div>;
    }
}

export default Chart;
