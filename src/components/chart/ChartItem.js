import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class ChartItem extends Component {

    state = {

    }
    
    render() {

        const { title, apart, officetel, house } = this.props;

        const style ={
            minwidth: '310px',
	        maxwidth: '800px',
	        height: '400px',
	        margin: '0 auto'
        };

        const xAxisList = Object.keys(apart);
        
        console.log(xAxisList);
        const apartDataList = Object.values(apart);
        const officetelDataList = Object.values(officetel);
        const housetDataList = Object.values(house);
        
        const config = {
            title: {
                text: title
            },
            xAxis:{
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
                data:apartDataList
            },{
                name:'오피스텔',
                data:officetelDataList
            },{
                name:'연립다세대',
                data:housetDataList
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