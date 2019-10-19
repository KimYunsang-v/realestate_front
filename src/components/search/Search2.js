/*global daum*/
import React, {Component} from 'react';
import SearchPage from './SearchPage';
import MapPage2 from './map/mapPage2';
import ResultPage from './result/ResultPage';
import '../pages/Page.css';
import * as service from '../../lib/searchApi'

class Search2 extends Component {
    state = {
        loading: false,
        mapData : {
            latitude: 0,
            longitude : 0
        },
        resultData : '',
        date : '',
        address : '역삼동',
    };

    // default값으로 지도 보여주기
    componentDidMount() {
        console.log("Search>componentDidMount");
        //this.kakaoPlacesSearch(inputData);
    }

    //SearchPage에서 검색
    //동으로 검색
    searchData = async (searchData) => {
        console.log("Search>searchDataSet");
        //const {housingTypeData, dealTypeData, inputData, options} = data[0];

        // this.kakaoPlacesSearch(searchData);        

        console.log(searchData);

        await service.getbuliding(searchData)
        .then(result => {
            console.log(result);
            this.setState({ resultData : result });
        });        

        this.setState({
            loading : true
        });
    }

    //kakao 장소검색api 호출
    kakaoPlacesSearch = async (input) => {
        if(input !== ''){
            var ps = new daum.maps.services.Places();
            await ps.keywordSearch(input, this.placesSearchCB);
        }

        this.setState({
            address : input
        })
    }

    //kakao 장소검색api 콜백함수
    placesSearchCB = (data, status) => {
        if (status === daum.maps.services.Status.OK) {
            console.log("Search>placesSearchCB");
            var date = new Date();
            this.setState({
                mapData : {
                    latitude: data[0].y,
                    longitude : data[0].x
                },
                date : date,
                loading: false
            });
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

    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems : pageOfItems });
    }

    render() {
        
        return(
            <div>
                {/* <div className="SearchDiv1">
                    <SearchPage searchDataSet={this.searchDataSet}
                        kakaoPlacesSearch = {this.kakaoPlacesSearch}/>
                </div> */}
                <div className="SearchDiv1">
                    <div className="SearchDivL">
                        <MapPage2 kakaoPlacesSearch = {this.kakaoPlacesSearch}
                                 mapData = {this.state.mapData} 
                                 loading = {this.state.loading}
                                 date = {this.state.date} />
                    </div>
                    <div className="SearchDivR">
                        <ResultPage resultData = {this.state.resultData} 
                                    searchData = {this.searchData}
                                    address = {this.state.address}
                                    //items={this.state.resultData.buliding}
                                    onChangePage={this.onChangePage}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search2;