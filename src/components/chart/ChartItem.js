import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class ChartItem extends Component {

    state = {

    }

    setXAxit = (type, length)  => {

        

        return ;
    }
    
    
    render() {

        const { title, apart, offistel, house } = this.props;

        // console.log(apart, title);
        // console.log(offistel, title);
        // console.log(house, title);

        const style ={
            minwidth: '310px',
	        maxwidth: '800px',
	        height: '400px',
	        margin: '0 auto'
        };

        const xAxisList = Object.keys(apart);
        
        console.log(xAxisList);
        const op = this.props.dop; 
        const ho = this.props.dho;
        const ap = this.props.dap;

        // const op = [15,22,58,65,88,99,100,110];
        // const ho = [51,55,56,59,60,42,33,45];
        // const ap = [60,62,65,67,69,55,76,79];
        
        const config = {
            title: {
                text: title
            },
            xAxis:{
                //categories: ['2011년','2012년','2013년','2014년','2015년','2016년','2017년','2018년']
                categories: xAxisList
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
                name:'아파트',
                data:ap
            },{
                name:'오피스텔',
                data:ho
            },{
                name:'연립다세대',
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

export default ChartItem;