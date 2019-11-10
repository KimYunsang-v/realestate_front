import React, { Component } from 'react';
import {Button, Container,Breadcrumb, List, Segment} from 'semantic-ui-react';
import * as data from '../chart/SelectData';

const regionTreeData = data.districtInfo;

class RegionTreeView extends Component {

    state = {
        sections : [],
        city: '',
        district: '',
        listItemData : Object.keys(regionTreeData),
    }
    
    clickCity = (data) => {
        if(this.state.city){
            this.props.getBoardData(this.state.city, data);
            console.log(this.state.city);
            this.setState({
                district : data
            });
        }else {
            var districts = regionTreeData[data];
            console.log(regionTreeData[data])
            this.setState({
                city : data,
                listItemData : districts,
            });
        }
    }

    clickDistrictListener = (data) => {
        this.setState({
            district : data
        });
        this.props.getBoardData(this.state.city, this.state.district)
    }
    
    clickBackBtn = () => {
        this.setState({
            city : '',
            district: '',
            listItemData : Object.keys(regionTreeData),
            sections : []
        })
    }

    render() {

        console.log(regionTreeData)

        var {listItemData, city, district} = this.state;
        var breadcrumbCity = '';

        if(city){
            breadcrumbCity = (
                <Breadcrumb>
                    <Breadcrumb.Section link>{city}</Breadcrumb.Section>
                </Breadcrumb>
            )
        }
        
        if(district){
            breadcrumbCity = (
                <Breadcrumb>
                    <Breadcrumb.Section link>{city}</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section active>{district}</Breadcrumb.Section>
                </Breadcrumb>
            )
        }
        
        var listItem = listItemData.map(data => {
            return (
                <List.Item as='a' onClick = {() => this.clickCity(data)}>
                    {data}
                </List.Item>
            )
        })
        
        var backBtn  = '';
        if(this.state.city) {
            backBtn = (
                <Button onClick={this.clickBackBtn} icon ='arrow circle left' size='small'/> 
            )
        }
        
        return(
            <Container>
                <Segment style={{height : 50}}>
                    {backBtn}
                    {breadcrumbCity}
                </Segment>
                <Segment>
                    <List divided relaxed style={{overflow: 'auto', height: 500 }}>
                        {listItem}
                    </List>
                </Segment>
            </Container>
        );
    }

}
export default RegionTreeView;