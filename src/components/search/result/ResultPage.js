import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './ResultPage.css';
import { Input, Divider, Button, Dropdown, Popup, Grid, Image } from 'semantic-ui-react'
import ResultList from './ResultList';
import Pagination from './Pagination';

const houseoptions = [
    { key: 'APART', text: '아파트', value: 'apart' },
    { key: 'OFFICETEL', text: '오피스텔', value: 'officetel' },
    { key: 'HOUSE', text: '주택', value: 'house' },
]

const dealoptions = [
    { key: 'LEASE', text: '전세', value: 'charter' },
    { key: 'DEAL', text: '매매', value: 'bargain' },
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

        this.props.searchData(data);
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
        //const dataList = [];
        var dataList = '';

        if(resultData){
            dataList = resultData.map(
                data => (
                    <ResultList info = {data} />
                )
            )
        } else {
            dataList = '데이터가 없습니다.'
        }

        return (
            <div>
                <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            options={this.state.houseoptions}
                            placeholder="집 타입"
                            search
                            selection
                            onChange={this.handleChangeHouseType}
                            renderLabel={renderLabel}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                            options={this.state.dealoptions}
                            placeholder="거래 타입"
                            search
                            selection
                            onChange={this.handleChangeDealType}
                            renderLabel={renderLabel2}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                        onClick = {this.clickSearchButton}
                        >
                            조회
                        </Button>

                    </Grid.Column>
                </Grid.Row>
                </Grid>
                {/* 매물보여주는 div */}
                <div className="dealTypeDiv">
                    {/* {list} */}
                    {dataList}                    
                </div>
                <div className="paginationDiv">
                    {/* <Pagination items={items} onChangePage={onChangePage} /> */}
                </div>
            </div>
        );
    }
}

export default ResultPage;