import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

const con = {
    title: {
        text: '전세값'
    },
    xAxis:{
        categories:['2011년','2012년','2013년','2014년','2015년','2016년','2017년','2018년']
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

    // plotOptions: {
    //     series: {
    //         label: {
    //             connectorAllowed: false
    //         },
    //         pointStart: 2010
    //     }
    // },

    series: [{
        name: '오피스텔',
        data: [26, 43, 23, 34, 54, 13, 45, 23]
    }, {
        name: '주택',
        data: [47, 23, 11, 23, 44, 23, 43, 41]
    }, {
        name: '아파트',
        data: [32, 35, 46, 49, 14, 55, 23, 46]
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


class HighCharts extends Component {

    render() {
        const style ={
            minwidth: '310px',
	        maxwidth: '800px',
	        height: '400px',
	        margin: '0 auto'
        };
        const op = [15,22,58,65,88,99,100,110];
        const ho = [51,55,56,59,60,42,33,45];
        const ap = [60,62,65,67,69,55,76,79];
        const cate = ['2011년','2012년','2013년','2014년','2015년','2016년','2017년','2018년'];
        
        const config = {
            title: {
                text: '전세값'
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

export default HighCharts;