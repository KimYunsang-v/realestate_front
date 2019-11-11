/*global daum*/
import React, {Component} from 'react';
import { Input, Grid,Segment, Header } from 'semantic-ui-react'
import './MapPage.css';
const { kakao } = window;
var map = null;
var marker = null;
// var kakao = kakao;

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
        
        this.kakao = kakao
        // kakao.init('52b39c47d2be0c937abcae9bafe0bd16')
        let el = document.getElementById('map');
        console.log(el);
        let options = {
            center: new daum.maps.LatLng(37.615095,127.0109226), //지도의 중심좌표.
            level: 3,
            minLevel: 1,
            maxLevel: 4
        };

        map = new daum.maps.Map(el, options); //지도 생성 및 객체 리턴
    }

    componentWillUpdate(nextProps){
        if(this.props.markerData === nextProps.markerData){
            
        }
        
        if(this.props.markerData !== nextProps.markerData && this.props.searchData === nextProps.searchData){            
            console.log("componentWillUpdate --- 마커찍자 ");
            
            // 마커가 표시될 위치입니다
            const { latitude, longitude } = nextProps.markerData;
            var markerPosition  = new daum.maps.LatLng(latitude, longitude);           

            if(marker){
                marker.setPosition(markerPosition);
            } else {
                // 마커를 생성합니다
                marker = new daum.maps.Marker({
                    position: markerPosition
                });
            }

            map.setCenter(markerPosition)
            marker.setMap(map);
        } else {
            console.log("componentWillUpdate --- 검색 ");
            console.log(nextProps)
            const { latitude, longitude } = nextProps.searchData;
            if(latitude === 0){
                var bounds  = new daum.maps.LatLng(37.615095,127.0109226); 
            }else {
                var bounds  = new kakao.maps.LatLng(latitude, longitude); 
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
        console.log("map rendering");

        return (
            <Segment basic>
                
                    <Grid columns={2} horizontal>
                        <Grid.Column basic width={8} style={{ paddingTop : 0}}>
                            <Input style={{ width : '100%', height: '50px', fontSize: 20}} icon='search' placeholder='지역이나 역명' onChange={this.searchChange} 
                                        value={this.state.inputSearch} onKeyDown={this.keyPress} />
                        </Grid.Column>
                        <Grid.Column textAlign='center' width={3} textAlign="center">
                            <Header as='h2' icon='building outline' content={this.state.searchRegion} />
                        </Grid.Column>
                    </Grid>
                <Segment id="map" className="map" style={{ width : '100%', height: '550px'}}/>
                
            </Segment>
        )
    }
}

export default MapPage;
