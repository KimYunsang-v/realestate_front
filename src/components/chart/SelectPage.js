//날짜, 지역 선택 페이지
import React, { Component } from 'react';
import { Dropdown, Button, Segment } from 'semantic-ui-react'
import * as data from './SelectData';
import './SelectPage.css';

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
            month: ''
        };
    }

    // 시/도
    cityChange = (e, { value }) => {
        if(value==="") {
            // dropdown 초기화 문제!
            this.setState({districtData: []});
            this.setState({neighborhoodData: []});
        }
        else if(value==="세종특별자치시"){
            // 시/군/구 없음 -> 읍/면/동
            this.setState({neighborhoodData : data.district(`${value}`)});
        }
        else {
            this.setState({districtData : data.district(`${value}`)});
        }

        this.setState({city : value});
    };

    // 시/군/구
    districtChange = (e, { value }) => {
        if(value==="") {
            // dropdown 초기화 문제!
            this.setState({neighborhoodData: []});
        }
        else {
            this.setState({neighborhoodData : data.neighborhood(this.state.city, `${value}`)});
        }
        this.setState({district : value});
    };

    // 읍/면/동
    neighborhoodChange = (e, { value }) => {
        this.setState({neighborhood : value});
    };

    // 년
    yearChange = (e, { value }) => {
        this.setState({year : value});
    };

    // 월
    monthChange = (e, { value }) => {
        this.setState({month : value});
    };

    // 조회 버튼 이벤트
    searchClick = () => {
        let data = [];
        let {city, district, neighborhood, year, month} = this.state;

        data.push({
            city: city,
            district: district,
            neighborhood: neighborhood,
            year: year,
            month: month
        });

        // 부모 컴포넌트 (Home)로 전달
        this.props.changeConditionData(data);
    };

    render() {
        const {
            cityData,
            districtData,
            neighborhoodData,
            yearData,
            monthData
        } = this.state;

        return (
            <div className="div">
                <Segment>
                    <span className="dropdownFirst"><Dropdown placeholder='시/도' clearable search selection options={cityData} onChange={this.cityChange}/></span>
                    <span className="dropdown"><Dropdown placeholder='시/군/구' clearable search selection options={districtData} onChange={this.districtChange}/></span>
                    <span className="dropdown"><Dropdown placeholder='읍/면/동' clearable search selection options={neighborhoodData} onChange={this.neighborhoodChange}/></span>
                
                    <span className="dropdown"><Dropdown placeholder='년' clearable selection options={yearData} onChange={this.yearChange}/></span>
                    <span className="dropdown"><Dropdown placeholder='월' clearable selection options={monthData}  onChange={this.monthChange}/></span>
                
                    <span className="searchBtn"><Button color="grey" onClick={this.searchClick}>조회</Button></span>
                </Segment>
            </div>
        );
    }
}

export default SelectPage;