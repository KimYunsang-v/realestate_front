import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import {Segment, Header, Icon} from 'semantic-ui-react';

class ChartItem extends Component {

    static defaultProps = {
        title : '',
        apart : [],
        officetel : [],
        house : [],
      }

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
        
        var xAxisList = '';
        var apartDataList = [];
        var officetelDataList = [];
        var housetDataList = [];
        var renderItem = null;
        var seriesData = [];

        if(apart){
            xAxisList = Object.keys(apart);
            apartDataList = Object.values(apart);
            seriesData.push({
                name:'아파트',
                data:apartDataList
            })
        }
        if (officetel) {
            xAxisList = Object.keys(officetel);
            officetelDataList = Object.values(officetel);
            seriesData.push({
                name:'오피스텔',
                data:officetelDataList
            })
        if (house){
            xAxisList = Object.keys(house);
            housetDataList = Object.values(house);
            seriesData.push({
                name:'주택',
                data:housetDataList
            })
        }

        console.log(apart)

        if(apart || officetel || house){
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
                series: seriesData,
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

            renderItem = (
                <ReactHighcharts config ={config}></ReactHighcharts>
            )

        } else {
            renderItem = (
                <Segment placeholder piled style={{ height: 400, marginTop:20 }}>
                    {/* <Image src={noData} size='small'/> */}
                    <Header icon>
                        <Icon name='search'/>
                        데이터가 없습니다.
                    </Header>
                </Segment>
            )
        }
        return( 
            <div sytle={style}>
                {renderItem}
            </div>
        );
    }
}
}


export default ChartItem;