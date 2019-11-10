import React, { Component } from 'react';
import { Grid, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './ResultPage.css';

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
        const {name, area, floor, price, deposit} = this.props.info
        

        return (
                
            <List.Item style={{height: 65 }} onClick={this.itemClickListener} verticalAlign='center' >
                <List.Icon size='large' verticalAlign='middle' name='building' />                
                <List.Content>
                    <List.Header>
                        <font color="grey"><h4>{name}  {floor}층 </h4></font>                    
                    </List.Header>
                    {deposit?(<font color="orange">{deposit}/{price}</font>):(<font color="orange">{price}</font>)}만원
                    <h4 className="title">({area}㎡)</h4>
                </List.Content>
                <Grid.Column width={9}>                      
                </Grid.Column>
            </List.Item>
            
            
        );
    }
}

export default ResultList;