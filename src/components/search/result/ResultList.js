import React, { Component } from 'react';
import { Grid, Image, Segment, Label, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './ResultPage.css';

const hosingType=[
    {value :require('../../../image/apart.png')},
    {value :require('../../../image/officetel.PNG')},
    {value :require('../../../image/house.jpg')}
]

class ResultList extends Component {
    static defaultProps = {
        info: {
            no:'0',
            city: 'city',
            groop: 'groop',
            dong: 'dong',
            name: 'name',
            area: 'area',
            floor: 'floor',
            type: 'type',
            constructorYear: 'constructorYear',
            price:'price',
            deposit: 'deposit',
            dealType: 'dealType',
        },
    }

    itemClickListener = () => {
        const {dong, name} = this.props.info;

        this.props.selectedBuildingListener(dong + " " + name);
    }


    render() {
        const {address, dong, name, area, floor, type, price, deposit, dealType} = this.props.info
        var housingImage= ''
        if(type==='apart'){
            housingImage=hosingType[0].value
        }else if(type==='officetel'){
            housingImage=hosingType[1].value
        }else {
            housingImage=hosingType[2].value
        }

        return (
                
            <List.Item style={{height: 100 }} onClick={this.itemClickListener}>
                {/* <Grid.Column width={4}>
                    
                </Grid.Column> */}
                <List.Icon size='large' verticalAlign='middle' src={housingImage} />
                <List.Header>
                    <font color="grey"><h4>{name}  {floor}층 </h4></font>                    
                </List.Header>
                <List.Content>
                    {deposit?(<font color="orange">{deposit}/{price}</font>):(<font color="orange">{price}</font>)}만원
                    <h4 className="title">({area}㎡)</h4>
                </List.Content>
                <Grid.Column width={9}>
                {/* <Label circular>{dealType}</Label> */}   
                    
                    
                    
                </Grid.Column>
            </List.Item>
            
            
        );
    }
}

export default ResultList;