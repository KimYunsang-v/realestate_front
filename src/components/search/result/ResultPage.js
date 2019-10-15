import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './ResultPage.css';
import { Input, Divider, Button, Dropdown, Popup, Grid, Image } from 'semantic-ui-react'
import ResultList from './ResultList';
import Pagination from './Pagination';

const houseoptions = [
    { key: 'APART', text: '아파트', value: 'APART' },
    { key: 'OFFICETEL', text: '오피스텔', value: 'OFFICETEL' },
    { key: 'HOUSE', text: '주택', value: 'HOUSE' },
]

const dealoptions = [
    { key: 'LEASE', text: '전세', value: 'LEASE' },
    { key: 'DEAL', text: '매매', value: 'DEAL' },
    { key: 'MONTH', text: '월세', value: 'MONTH' },
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
        }
    }

    //house
    handleAdditionHouseType = (e, { value }) => {
        this.setState({
         houseoptions: [{ text: value, value }, ...this.state.options],
        });
    }
    
    handleChangeHouseType = (e, { value }) => {
        this.setState({ currentValues: value,houses:value })
    }

    //deal
    handleAdditionDealType = (e, { value }) => {
        this.setState({
         dealoptions: [{ text: value, value }, ...this.state.options],
        });
    }

    handleChangeDealType = (e, { value }) => {
        this.setState({ currentValuesD: value,deals:value })
    }

    render() {
        const { pageOfItems } = this.props.resultData;
        const { items,onChangePage } = this.props;
        const list = pageOfItems.map(
            info => (
                <ResultList key={info.no}
                    info={info} />
            )
        );
        return (
            <div>
                <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            options={this.state.houseoptions}
                            placeholder="집 타입"
                            search
                            selection
                            multiple
                            allowAdditions
                            onAddItem={this.handleAdditionHouseType}
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
                            multiple
                            allowAdditions
                            onAddItem={this.handleAdditionDealType}
                            onChange={this.handleChangeDealType}
                            renderLabel={renderLabel2}
                        />
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                {/* 매물보여주는 div */}
                <div className="dealTypeDiv">
                    {list}
                </div>
                <div className="paginationDiv">
                    <Pagination items={items} onChangePage={onChangePage} />
                </div>
            </div>
        );
    }
}

export default ResultPage;