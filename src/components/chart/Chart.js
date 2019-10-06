import React, { Component } from 'react';
import ChartDeal from 'highcharts/ChartDeal';
import ChartLease from 'highcharts/ChartLease'
import ChartMonth from 'highcharts/ChartMonth';
import {Grid, Segment, GridColumn} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Chart extends Component {
    render() {
        // 조건 및 결과 데이터
        const {conditionData} = this.props;

        console.log(conditionData)

        const style = {
            padding:'1rem'
        };
        var dealtype='';
        var housingtype='';
        var bargainApart = [], bargainOffistel = [], bargainHouse = [], charterApart = [], charterOffistel = [], charterHouse = []
                ,rentApart = [], rentOffistel = [], rentHouse = [];
        var i=0,dap=[],dho=[],dop=[],lop=[],lho=[],lap=[],mapp=[],mho=[],mop=[];
        


        for(i=0;i<9;i++){
            if(conditionData.result[i]!==undefined){
                dealtype=conditionData.result[i].dealType;
                housingtype=conditionData.result[i].housingType;
                

                if(dealtype === '매매'){
                    if(housingtype === 'apart'){
                        bargainApart = conditionData.result[i].average;
                    }else if(housingtype === 'housing'){
                        bargainHouse = conditionData.result[i].average;
                    }else{
                        bargainOffistel =conditionData.result[i].average;
                    }
                }else if(dealtype === '전세'){
                    if(housingtype === 'apart'){
                        charterApart = conditionData.result[i].average;
                    }else if(housingtype === 'housing'){
                        charterHouse = conditionData.result[i].average;
                    }else{
                        charterOffistel = conditionData.result[i].average;
                    }
                }else{
                    if(housingtype === 'apart'){
                        rentApart = conditionData.result[i].average;
                    }else if(housingtype === 'housing'){
                        rentOffistel = conditionData.result[i].average;
                    }else{
                        rentHouse = conditionData.result[i].average;
                    }
                }
            }
        }

        return (
            <div style={style}>
                <Segment>
                    <Grid columns={3} relaxed='very'>
                        <GridColumn>
                            <ChartDeal dop={dop} dap={dap} dho={dho}/>
                        </GridColumn>
                        <GridColumn>
                            <ChartLease lop={lop} lap={lap} lho={lho}/>
                        </GridColumn>
                        <GridColumn>
                            <ChartMonth mop={mop} mho={mho} map={mapp}/>
                        </GridColumn>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default Chart;