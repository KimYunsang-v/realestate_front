import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './ResultPage.css';
import { Input, Divider, Button, Dropdown, Segment, Grid, Image, List, Header, Icon, Pagination, Form, Checkbox } from 'semantic-ui-react'
import ResultList from './ResultList';
import noData from '../../../image/noData.png'
// import Pagination from './Pagination';

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

const renderLabel = label =>({
    color:'blue',
    content :`${label.text}`
})

const renderLabel2 = label =>({
    color:'pink',
    content :`${label.text}`
})

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

    //house
    // handleAdditionHouseType = (e, { value }) => {
    //     this.setState({
    //      houseoptions: [{ text: value, value }, ...this.state.options],
    //     });
    // }
    
    handleChangeHouseType = (e, { value }) => {
        this.setState({ housingType : value })
    }

    //deal
    // handleAdditionDealType = (e, { value }) => {
    //     this.setState({
    //      dealoptions: [{ text: value, value }, ...this.state.options],
    //     });
    // }

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
        //const { pageOfItems } = this.props.resultData;
        //const { items,onChangePage } = this.props;
        // const list = pageOfItems.map(
        //     info => (
        //         <ResultList key={info.no}
        //             info={info} />
        //     )
        // );
        const { resultData }  = this.props;

        const {paging} = this.state.paging
        console.log("result page rendering")

        console.log(resultData)
        //const dataList = [];
        var dataList = '';

        if(resultData){
            dataList = resultData.map(
                (data,key) => (                    
                    <ResultList key={key} info = {data} selectedBuildingListener = {this.props.selectedBuildingListener}/>                        
                )
            )
        }

        var resultSegment = '';

        if(dataList.length != 0){
            resultSegment = (
                <Segment raised style={{overflow: 'auto', height: 500 }}>
                    <List selection divided relaxed> {dataList} </List>                           
                </Segment>
            )
        }
        else {
            resultSegment = (
                <Segment placeholder piled style={{ height: 500, marginTop:20 }}>
                    {/* <Image src={noData} size='small'/> */}
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
                    <Grid columns={3}>
                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='아파트'
                                    name='housingTypeRadioGroup'
                                    value='apart'
                                    checked={this.state.housingType === 'apart'}
                                    onChange={this.handleHousingTypeChange}
                                />
                                </Form.Field>
                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='주택'
                                    name='housingTypeRadioGroup'
                                    value='house'
                                    checked={this.state.housingType === 'house'}
                                    onChange={this.handleHousingTypeChange}
                                />
                                </Form.Field>
                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='오피스텔'
                                    name='housingTypeRadioGroup'
                                    value='officetel'
                                    checked={this.state.housingType === 'officetel'}
                                    onChange={this.handleHousingTypeChange}
                                />
                                </Form.Field>
                            </Form>
                        </Grid.Column>

                        <Grid.Column>
                            <Form>
                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='매매'
                                    name='dealTypeRadioGroup'
                                    value='bargain'
                                    checked={this.state.dealType === 'bargain'}
                                    onChange={this.handleDealTypeChange}
                                />
                                </Form.Field>
                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='전세'
                                    name='dealTypeRadioGroup'
                                    value='charter'
                                    checked={this.state.dealType === 'charter'}
                                    onChange={this.handleDealTypeChange}
                                />
                                </Form.Field>
                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='월세'
                                    name='dealTypeRadioGroup'
                                    value='rent'
                                    checked={this.state.dealType === 'rent'}
                                    onChange={this.handleDealTypeChange}
                                />
                            </Form.Field>
                        </Form>

                        </Grid.Column>

                        <Grid.Column>
                            <Button onClick = {this.clickSearchButton} > 조회 </Button>
                        </Grid.Column>

                    </Grid>
                    

                    
                    {/* <Dropdown
                        options={this.state.houseoptions}
                        placeholder="집 타입"
                        // defaultValue = {this.state.houseoptions[0].text}
                        search
                        selection
                        onChange={this.handleChangeHouseType}
                        renderLabel={renderLabel}
                    />
                                
                    <Dropdown
                        options={this.state.dealoptions}
                        placeholder="거래 타입"
                        // defaultValue = {this.state.dealoptions[0].text}
                        search
                        selection
                        onChange={this.handleChangeDealType}
                        renderLabel={renderLabel2}
                    />
                 */}
                
                    
                    </Segment>
                    {resultSegment}  

                    {/* <Pagination
                        activePage={paging}
                        totalPages= {10}
                        siblingRange={1}
                        onPageChange={this.pageChangeListener}
                    /> */}

            </Segment>
        
        );
    }
}

export default ResultPage;