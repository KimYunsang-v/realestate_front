/*global daum*/
import React, {Component} from 'react';
import { Input, Divider, Button, Dropdown, Popup, Grid, Image, Segment, Step, Statistic } from 'semantic-ui-react'
import './MapPage.css';

var map = null;
var marker = null;

class MapPage extends Component {
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

        //this.props.kakaoPlacesSearch('정릉동');
    }

    // shouldComponentUpdate(nextProps, nextState) {

    //     if(this.props.searchData === nextProps.searchData && this.props.markerData ){
    //         console.log("shouldComponentUpdate");
    //         return true;
    //     }else {
    //         return  false;
    //     }
    // }

    componentWillUpdate(nextProps){
        if(this.props.markerData === nextProps.markerData){
            
        }
        
        if(this.props.markerData !== nextProps.markerData && this.props.searchData === nextProps.searchData){            
            console.log("componentWillUpdate --- 마커찍자 ");
            console.log(nextProps)
            // 마커가 표시될 위치입니다
            const { latitude, longitude } = nextProps.markerData;
            var markerPosition  = new daum.maps.LatLng(latitude, longitude); 

            // 마커를 생성합니다
            marker = new daum.maps.Marker({
                position: markerPosition
            });

            map.setCenter(markerPosition)
            marker.setMap(map);
        } else {
            console.log("componentWillUpdate --- 검색 ");
            console.log(nextProps)
            const { latitude, longitude } = nextProps.searchData;
            if(latitude === 0){
                var bounds  = new daum.maps.LatLng(37.615095,127.0109226); 
            }else {
                var bounds  = new daum.maps.LatLng(latitude, longitude); 
            }            
            map.setCenter(bounds);
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
            this.props.kakaoPlacesSearch(this.state.inputData, "search");
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
        // let Loading;

        // const loading = this.props.loading;

        // const { latitude, longitude } = this.props.searchData;
        
        console.log("map rendering");

        // if(latitude && longitude){
        //     this.setBounds(latitude, longitude);
        // }
        
        // if(loading) {
        //     Loading = <img src="//s.zigbang.com/v1/web/search/loading2.gif" alt="" className="loadingShow"></img>
        // } else {
        //     Loading = <img src="//s.zigbang.com/v1/web/search/loading2.gif" alt="" className="loadingHide"></img>
        // }

        return (
            <Segment basic>
                <Segment.Group horizontal style = {{ marginTop : 0 }}>
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
                <Segment id="map" className="mapStyle"/>
                
            </Segment>
        )
    }
}

export default MapPage;
