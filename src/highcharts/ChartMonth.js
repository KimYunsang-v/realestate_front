import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class ChartMonth extends Component {
   
    render() {
        const style ={
            minwidth: '310px',
	        maxwidth: '800px',
	        height: '400px',
	        margin: '0 auto'
        };
        const op = this.props.mop; 
        const ho = this.props.mho;
        const ap = this.props.map;
        
        const cate = ['2011년','2012년','2013년','2014년','2015년','2016년','2017년','2018년'];
        
        const config = {
            title: {
                text: '월세'
            },
            xAxis:{
                categories:cate
            },
            yAxis: {
                title: {
                    text: '가격'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series:[{
                name:'오피스텔',
                data:op
            },{
                name:'주택',
                data:ho
            },{
                name:'아파트',
                data:ap
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        };
        return (
            <div sytle={style}>
                <ReactHighcharts config ={config}></ReactHighcharts>
            </div>
        );
    }
}

export default ChartMonth;