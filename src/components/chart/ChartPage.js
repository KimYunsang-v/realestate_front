import React, { Component } from 'react';
import ChartItem from './ChartItem';
import {Grid, Segment, GridColumn} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class ChartPage extends Component {
    render() {
        // 조건 및 결과 데이터
        const {conditionData} = this.props;

        console.log(conditionData)

        const style = {
            padding:'1rem'
        };
        var dealtype='';
        var housingtype='';
        var bargainApart = [], bargainOfficetel = [], bargainHouse = [], charterApart = [], charterOfficetel = [], charterHouse = []
                ,rentApart = {}, rentOfficetel = [], rentHouse = [];
        var i = 0;

        for(i=0;i<9;i++){
            if(conditionData.result[i]!==undefined){
                dealtype=conditionData.result[i].dealType;
                housingtype=conditionData.result[i].housingType;             
                
                if(!conditionData.result[i].average){
                    continue;
                }

                if(dealtype === 'bargain'){
                    if(housingtype === 'apart'){
                        bargainApart = conditionData.result[i].average;
                    }else if(housingtype === 'house'){
                        bargainHouse = conditionData.result[i].average;
                    }else{
                        bargainOfficetel = conditionData.result[i].average;
                    }
                }else if(dealtype === 'charter'){
                    if(housingtype === 'apart'){
                        charterApart = conditionData.result[i].average;
                    }else if(housingtype === 'house'){
                        charterHouse = conditionData.result[i].average;
                    }else{
                        charterOfficetel = conditionData.result[i].average;
                    }
                }else{
                    if(housingtype === 'apart'){
                        rentApart = conditionData.result[i].average;
                    }else if(housingtype === 'house'){
                        rentOfficetel = conditionData.result[i].average;
                    }else{
                        rentHouse = conditionData.result[i].average;
                    }
                }
            }
        }
        console.log("chart page rendering")
        return (
            
            <div style={style}>
                <Segment>
                    <Grid columns={3} relaxed='very'>
                        <GridColumn>
                            <ChartItem title={"매매"} apart={bargainApart} officetel={bargainOfficetel}  house = {bargainHouse}/>
                        </GridColumn>
                        <GridColumn>
                            <ChartItem title={"전세"} apart={charterApart} officetel={charterOfficetel} house = {charterHouse}/>
                        </GridColumn>
                        <GridColumn>
                            <ChartItem title={"월세"} apart={rentApart} officetel={rentOfficetel} house = {rentHouse} />
                        </GridColumn>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default ChartPage;