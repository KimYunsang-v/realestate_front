/*global daum*/
import React, {Component} from 'react';
import SearchPage from './SearchPage';
import MapPage from './map/MapPage';
import ResultPage from './result/ResultPage';
import '../pages/Page.css';
import * as service from '../../lib/searchApi'
import { Grid } from 'semantic-ui-react';

class Search extends Component {
    state = {
        mapData : {
            latitude: 0,
            longitude : 0
        },
        searchData : {
            latitude: 0,
            longitude : 0
        },
        markerData : {
            latitude: 0,
            longitude : 0
        },
        resultData : '',
        date : '',
        address : '정릉동',
        selectedBuilding : ''
    };

    // constructor(){
    //     this.searchData('정릉동');
    // }

    // default값으로 지도 보여주기
    componentDidMount() {
        console.log("Search > componentDidMount");
        //this.kakaoPlacesSearch(inputData);
    }

    //SearchPage에서 검색
    //동으로 검색
    searchDataListener = async (searchData) => {
        console.log("Search > searchDataSet");
        //const {housingTypeData, dealTypeData, inputData, options} = data[0];

        // this.kakaoPlacesSearch(searchData);
        console.log(searchData);

        delete searchData['address'];

        searchData['address'] = this.state.address;
        console.log(this.state.address);
        await service.getbuliding(searchData)
        .then(result => {
            console.log(result);
            this.setState({ resultData : result });
        });
    }

    selectedBuildingListener = async (input) => {
        console.log(input)    
        var ps = new daum.maps.services.Places();
        await ps.keywordSearch(input, this.placesMarkerCB);
        
    }

    //kakao 장소검색api 호출
    kakaoPlacesSearch = async (input) => {
        if(input !== ''){
            var ps = new daum.maps.services.Places();
            await ps.keywordSearch(input, this.placesSearchCB);
            this.setState({
                address : input,
                // result : ''
            })
        }        
    }

    //kakao 장소검색api 서치 콜백함수
    placesSearchCB = (data, status) => {
        if (status === daum.maps.services.Status.OK) {
            console.log("Search>placesSearchCB");
            console.log(data);
            this.setSearchData(data);
            return true;
        } else if (status === daum.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return false;
        } else if (status === daum.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return false;
        }
    }

    //kakao 장소검색api 마커 콜백함수
    placesMarkerCB = (data, status) => {
        if (status === daum.maps.services.Status.OK) {
            console.log("Search>placesSearchCB");
            this.setMarkerData(data);
            console.log(this.state);
            return true;
        } else if (status === daum.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return false;
        } else if (status === daum.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return false;
        }
    }

    setMarkerData = (data) => {
        this.setState({
            markerData : {
                latitude: data[0].y,
                longitude : data[0].x
            },
        });
    }

    setSearchData = (data) => {
        this.setState({
            resultData : '',
            searchData : {
                latitude: data[0].y,
                longitude : data[0].x
            },
        });
    }

    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems : pageOfItems });
    }

    render() {

        console.log("search page rendering")

        return(
                <Grid padded>
                        <Grid.Column width={10}>
                    
                            <MapPage kakaoPlacesSearch = {this.kakaoPlacesSearch}
                                    searchData = {this.state.searchData}
                                    markerData = {this.state.markerData}
                                    />
                        </Grid.Column>
                        
                        <Grid.Column width={6}>

                                <ResultPage resultData = {this.state.resultData}
                                            searchDataListener = {this.searchDataListener}
                                            address = {this.state.address}
                                            //items={this.state.resultData.buliding}
                                            onChangePage={this.onChangePage}
                                            selectedBuildingListener = {this.selectedBuildingListener} />
                        
                        </Grid.Column>
                </Grid>            
        )
    }
}

export default Search;