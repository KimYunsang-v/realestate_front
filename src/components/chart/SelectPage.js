//날짜, 지역 선택 페이지
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Dropdown, Button, Grid, Label, Search } from 'semantic-ui-react'
import * as data from './SelectData';
import './SelectPage.css';

const regionSearchData = data.neighborhoodInfo.map( (data, index) => ({
    key: index,
    text: data[0] + " " + data[1] + " " + data[2],
    value: data
}))

const resultRenderer = ({ text }) => <Label content={text} />

resultRenderer.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
}

class SelectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityData: data.city,
            districtData: [],
            neighborhoodData: [],
            yearData: data.year,
            monthData: data.month,
            city: '',
            district: '',
            neighborhood: '',
            year: '',
            month: '',
            inputData : '',
            inputText : '',
            isLoading : false,
            results : [],
        };
    }

    // 년
    yearChange = (e, { value }) => {
        this.setState({year : value});
    };

    // 조회 버튼 이벤트
    searchClick = () => {
        let data = [];
        let {year, month} = this.state;
        let {inputData} = this.state;

        console.log(inputData)

        data.push({
            city: inputData[0],
            district: inputData[1],
            neighborhood: inputData[2],
            year: year,
            month: month
        });

        console.log(data)
        // 부모 컴포넌트 (Home)로 전달
        this.props.changeConditionData(data);
    };

    handleResultSelect = (e, { result }) => this.setState({ 
        inputData: result.value,
        inputText: result.text 
    })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, inputText : value })
    
        setTimeout(() => {
          if (this.state.inputText.length < 1) 
            return this.setState({
                inputText : '',
                isLoading : false,
                results : [],
            })
    
          const re = new RegExp(_.escapeRegExp(this.state.inputText), 'i')
          const isMatch = (result) => re.test(result.value)
            
          this.setState({
            isLoading: false,
            results: _.filter(regionSearchData, isMatch),
          })
        }, 300)
    }

    render() {
        const {
            yearData,
            isLoading,
            results,
            inputText
        } = this.state;

        return (
                    <Grid centered style={{marginTop: 20}}> 
                        <Grid.Row columns={3} centered>
                            <Grid.Column width={6}>
                                     <Search
                                        loading={isLoading}
                                        onResultSelect={this.handleResultSelect}
                                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                            leading: true,
                                        })}
                                        results={results}
                                        value={inputText}
                                        resultRenderer={resultRenderer}
                                        {...this.props}
                                        style={{width: '100%', height: '50px', fontSize:20}}                                        
                                    />
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Dropdown placeholder='년' clearable selection options={yearData} onChange={this.yearChange} style={{width: '100%', height: '50px', fontSize:20}}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>

                            <Grid.Column width={6}>
                                <Button color="grey" onClick={this.searchClick} style={{width: '100%', height: '50px', fontSize:20}}>조회</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
        );
    }
}

export default SelectPage;