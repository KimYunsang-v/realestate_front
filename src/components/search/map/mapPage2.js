/*global daum*/
import React, {Component} from 'react';
import { Input, Divider, Button, Dropdown, Popup, Grid, Image, Segment, Step, Statistic } from 'semantic-ui-react'
import './MapPage.css';

var map = null;

class MapPage2 extends Component {
    constructor(props) {
        super(props);
        this.state = {      
            mapInfo: [],
            date : '',
            searchRegion: '정릉동'
        };
    }

    componentDidMount() {
        console.log("MapPage > componentDidMount");
    
        let el = document.getElementById('map');
        let options = {
            center: new daum.maps.LatLng(37.615095,127.0109226), //지도의 중심좌표.
            level: 3,
            minLevel: 1,
            maxLevel: 4
        };

        map = new daum.maps.Map(el, options); //지도 생성 및 객체 리턴

        this.props.kakaoPlacesSearch('정릉동');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.date !== nextProps.date){
            return true;
        }else {
            return  false;
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.selectedBuilding != nextProps.selectedBuilding){
            this.props.kakaoPlacesSearch(this.state.inputData);
        }
    }

    searchChange = (e) => {
        this.setState({
            inputData: e.target.value
        });
    }

    keyPress = (e) =>  {
        if (e.key === 'Enter') {
            console.log('do validate');
            this.props.kakaoPlacesSearch(this.state.inputData);
            this.setState({
                searchRegion : this.state.inputData
            })
        }
    }

    setBounds = (latitude, longitude) => {    
        if(latitude && longitude){
            var bounds = new daum.maps.LatLng(latitude ,longitude);
            map.setCenter(bounds);
        }
    }

    render() {
        let Loading;

        const loading = this.props.loading;

        const { latitude, longitude } = this.props.mapData;

        if(latitude && longitude){
            this.setBounds(latitude, longitude);
        }
        
        if(loading) {
            Loading = <img src="//s.zigbang.com/v1/web/search/loading2.gif" alt="" className="loadingShow"></img>
        } else {
            Loading = <img src="//s.zigbang.com/v1/web/search/loading2.gif" alt="" className="loadingHide"></img>
        }

        return (
            <Segment basic>
                <Segment.Group basic horizontal style = {{ marginTop : 0 }}>
                    <Segment basic floated="left" >
                        <Input style={{ width : 350}} icon='search' placeholder='지역이나 역명' onChange={this.searchChange} 
                                    value={this.state.inputSearch} onKeyDown={this.keyPress} />
                    {/* <Step.Group>
                        <Step>
                            <Step.Title>현재 검색 지역</Step.Title>
                            <Step.Description>{this.state.searchRegion}</Step.Description>
                        </Step>
                    </Step.Group> */}
                    </Segment>
                    <Segment floated="right" textAlign='center'>
                        <Statistic size='mini' color='red'>
                            <Statistic.Value>{this.state.searchRegion}</Statistic.Value>
                            <Statistic.Label>현재 검색 지역</Statistic.Label>
                        </Statistic>
                    </Segment>
                </Segment.Group>
                {/* <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=52b39c47d2be0c937abcae9bafe0bd16"></script> */}
                <Segment id="map" className="mapStyle">
                    {Loading}
                </Segment>
            </Segment>
        )
    }
}

export default MapPage2;
