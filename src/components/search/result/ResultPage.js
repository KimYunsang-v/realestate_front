import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './ResultPage.css';
import { Divider, Button, Segment, Grid, List, Header, Icon, Pagination, Checkbox} from 'semantic-ui-react'
import ResultList from './ResultList';

const houseoptions = [
    { key: 'APART', text: '아파트', value: 'apart' },
    { key: 'OFFICETEL', text: '오피스텔', value: 'officetel' },
    { key: 'HOUSE', text: '주택', value: 'house' },
]

const dealoptions = [
    { key: 'DEAL', text: '매매', value: 'bargain' },
    { key: 'LEASE', text: '전세', value: 'charter' },    
    { key: 'MONTH', text: '월세', value: 'rent' },
]

class ResultPage extends Component {
    static defaultProps = {
        list: []
    }

    constructor(props){
        super(props)
        this.state = {
            houseoptions,dealoptions,
            housingType : 'apart',
            dealType : 'bargain',
            paging : 1
        }
    }
    
    handleChangeHouseType = (e, { value }) => {
        this.setState({ housingType : value })
    }

    handleChangeDealType = (e, { value }) => {
        this.setState({ dealType : value })
    }

    clickSearchButton = ( ) => {
        const data = {
            'dealType' : this.state.dealType,
            'housingType' : this.state.housingType,
            'paging' : this.state.paging,
            'address' : this.props.address
        }

        this.props.searchDataListener(data);
    }

    pageChangeListener = (e, { activePage }) => {
        console.log(e);
        this.setState({paging : activePage})

        const data = {
            'dealType' : this.state.dealType,
            'housingType' : this.state.housingType,
            'paging' : activePage,
            'address' : this.props.address
        }

        this.props.searchDataListener(data);
    }

    handleHousingTypeChange = (e, { value }) => {
        console.log(value)
        this.setState({ value,
            housingType : value })
    }

    handleDealTypeChange = (e, { value }) => {
        this.setState({ value,
            dealType : value
         })
    }

    render() {
        const { resultData }  = this.props;

        const {paging} = this.state.paging
        console.log("result page rendering")

        console.log(resultData)
        var dataList = '';

        if(resultData){
            dataList = resultData.map(
                (data,key) => (                    
                    <ResultList key={key} info = {data} selectedBuildingListener = {this.props.selectedBuildingListener}/>                        
                )
            )
        }

        var resultSegment = '';

        if(dataList.length !== 0){
            resultSegment = (
                <Segment raised style={{overflow: 'auto', height: 480 }}>
                    <List selection divided relaxed> {dataList} </List>    
                    <Pagination
                        defaultActivePage = {1}
                        activePage={paging}
                        totalPages= {4}
                        siblingRange={1}
                        onPageChange={this.pageChangeListener}
                    />                       
                </Segment>
            )
        }
        else {
            resultSegment = (
                <Segment placeholder piled style={{ height: 480, marginTop:20 }}>
                    
                    <Header icon>
                        <Icon name='search'/>
                        데이터가 없습니다.
                    </Header>
                </Segment>
            )
        }

        return (
            <Segment basic style={{ paddingTop : 0}}>
                <Segment>
                    <Grid>
                        <Grid.Row columns={3} style={{padding:5}} centered>

                                <Grid.Column style={{padding : '5px'}} width={4}>
                                    <Checkbox                                        
                                        radio
                                        label='아파트'
                                        name='housingTypeRadioGroup'
                                        value='apart'
                                        checked={this.state.housingType === 'apart'}
                                        onChange={this.handleHousingTypeChange}
                                    />
                                </Grid.Column>
                                <Grid.Column style={{padding : '5px'}} width={4}>
                                <Checkbox
                                    radio
                                    label='주택'
                                    name='housingTypeRadioGroup'
                                    value='house'
                                    checked={this.state.housingType === 'house'}
                                    onChange={this.handleHousingTypeChange}
                                />
                                </Grid.Column>
                                <Grid.Column  style={{padding : '5px'}} width={4}>

                                <Checkbox
                                    radio
                                    label='오피스텔'
                                    name='housingTypeRadioGroup'
                                    value='officetel'
                                    checked={this.state.housingType === 'officetel'}
                                    onChange={this.handleHousingTypeChange}
                                />
                            </Grid.Column>
                        </Grid.Row>

                        <Divider style={{ margin : 0}}/>

                        <Grid.Row columns={3} style={{padding:5}} centered>

                                <Grid.Column style={{padding : '5px'}} width={4}>
                                <Checkbox
                                    radio
                                    label='매매'
                                    name='dealTypeRadioGroup'
                                    value='bargain'
                                    checked={this.state.dealType === 'bargain'}
                                    onChange={this.handleDealTypeChange}
                                />
                                </Grid.Column>

                                <Grid.Column style={{padding : '5px'}} width={4}>
                                <Checkbox
                                    radio
                                    label='전세'
                                    name='dealTypeRadioGroup'
                                    value='charter'
                                    checked={this.state.dealType === 'charter'}
                                    onChange={this.handleDealTypeChange}
                                />
                                </Grid.Column>

                                <Grid.Column style={{padding : '5px'}} width={4}>
                                <Checkbox
                                    radio
                                    label='월세'
                                    name='dealTypeRadioGroup'
                                    value='rent'
                                    checked={this.state.dealType === 'rent'}
                                    onChange={this.handleDealTypeChange}
                                />

                        </Grid.Column>
                        </Grid.Row>

                        <Divider style={{ margin : 0}}/>

                        <Grid.Row centered style={{padding:3}}>
                            <Button onClick = {this.clickSearchButton} > 조회 </Button>
                        </Grid.Row>
                    </Grid>
                    
                    </Segment>
                    {resultSegment}  
            </Segment>
        
        );
    }
}

export default ResultPage;