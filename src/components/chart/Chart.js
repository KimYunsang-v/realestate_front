import React, { Component } from 'react';
import ChartItem from './ChartItem';
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
        var bargainApart = {}, bargainOffistel = {}, bargainHouse = {}, charterApart = {}, charterOffistel = {}, charterHouse = {}
                ,rentApart = {}, rentOffistel = {}, rentHouse = {};
        var i = 0;
        // var i=0,dap=[],dho=[],dop=[],lop=[],lho=[],lap=[],mapp=[],mho=[],mop=[];

        for(i=0;i<9;i++){
            if(conditionData.result[i]!==undefined){
                dealtype=conditionData.result[i].dealType;
                housingtype=conditionData.result[i].housingType;                

                if(dealtype === 'bargain'){
                    if(housingtype === 'apart'){
                        bargainApart = conditionData.result[i].average;
                    }else if(housingtype === 'house'){
                        bargainHouse = conditionData.result[i].average;
                    }else{
                        bargainOffistel =conditionData.result[i].average;
                    }
                }else if(dealtype === 'charter'){
                    if(housingtype === 'apart'){
                        charterApart = conditionData.result[i].average;
                    }else if(housingtype === 'house'){
                        charterHouse = conditionData.result[i].average;
                    }else{
                        charterOffistel = conditionData.result[i].average;
                    }
                }else{
                    if(housingtype === 'apart'){
                        rentApart = conditionData.result[i].average;
                    }else if(housingtype === 'house'){
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
                            <ChartItem title={"매매"} apart={bargainApart} offistel={bargainOffistel}  house = {bargainHouse}/>
                        </GridColumn>
                        <GridColumn>
                            <ChartItem title={"전세"} apart={charterApart} offistel={charterOffistel} house = {charterHouse}/>
                        </GridColumn>
                        <GridColumn>
                            <ChartItem title={"월세"} apart={rentApart} offistel={rentOffistel} house = {rentHouse} />
                        </GridColumn>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default Chart;