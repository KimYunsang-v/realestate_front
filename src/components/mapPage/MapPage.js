/*global daum*/
import React, {Component} from 'react';
import './MapPage.css';

var map = null;
class MapPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionDataList: [],
            option: [],
            optionCnt: 0,
            optionApiCnt: 0,
            mapInfo: []
        };
    }

    componentDidMount() {
        console.log("MapPage>componentDidMount");
    
        let el = document.getElementById('map');
        let options = { 
            center: new daum.maps.LatLng(37.615095,127.0109226), //지도의 중심좌표.
            level: 3,
            minLevel: 1,
            maxLevel: 4
        };

        map = new daum.maps.Map(el, options); //지도 생성 및 객체 리턴

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤
        let mapTypeControl = new daum.maps.MapTypeControl();
        map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

        // 줌 컨트롤
        //var zoomControl = new daum.maps.ZoomControl();
        //map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

        // 드래그가 끝날 때 발생
        daum.maps.event.addListener(map, 'dragend', this.mapDrag);

        // 확대 수준이 변경되면 발생
        daum.maps.event.addListener(map, 'zoom_changed', this.mapZoom);
    }

    //props update
    shouldComponentUpdate(nextProps) {
        if (nextProps.resultData.date !== this.props.resultData.date) { //resultData 변경 -> 렌더링
            console.log("MapPage>shouldComponentUpdate>true");

            let data = nextProps.resultData.buliding;

            console.log(data);

            //이미지 마커
            var position, markerImageSrc, imageSize = new daum.maps.Size(40, 40); 
            //마커 객체
            var markers=[];

            for (let i = 0; i < data.length; i++) {
                position = new daum.maps.LatLng(data[i].latitude, data[i].longitude);
                var markerImage = null ;

                if (data[i].type === "아파트" && data[i].dealType === "전세") {
                    markerImageSrc =require("../image/marker_LA.png");
                    markerImage =this.createMarkerImage(markerImageSrc,imageSize);
                } else if (data[i].type === "아파트" && data[i].dealType === "매매") {
                    markerImageSrc =require("../image/marker_DA.png");
                    markerImage =this.createMarkerImage(markerImageSrc,imageSize);
                } else if (data[i].type === "아파트" && data[i].dealType === "월세") {
                    markerImageSrc =require("../image/marker_MA.png");
                    markerImage =this.createMarkerImage(markerImageSrc,imageSize);
                } else if (data[i].type === "오피스텔" && data[i].dealType === "전세") {
                    markerImageSrc =require("../image/marker_LO.png");
                    markerImage =this.createMarkerImage(markerImageSrc,imageSize);
                } else if (data[i].type === "오피스텔" && data[i].dealType === "매매") {
                    markerImageSrc =require("../image/marker_DO.png");
                    markerImage =this.createMarkerImage(markerImageSrc,imageSize);
                } else if (data[i].type === "오피스텔" && data[i].dealType === "월세") {
                    markerImageSrc =require("../image/marker_MO.png");
                    markerImage =this.createMarkerImage(markerImageSrc,imageSize);
                } else if (data[i].type === "주택" && data[i].dealType === "전세") {
                    markerImageSrc =require("../image/marker_LH.png");
                    markerImage =this.createMarkerImage(markerImageSrc,imageSize);
                } else if (data[i].type === "주택" && data[i].dealType === "매매") {
                    markerImageSrc =require("../image/marker_DH.png");
                    markerImage =this.createMarkerImage(markerImageSrc,imageSize);
                } else if (data[i].type === "주택" && data[i].dealType === "월세") {
                    markerImageSrc =require("../image/marker_MH.png");
                    markerImage =this.createMarkerImage(markerImageSrc,imageSize);
                }

                var marker = this.createMarker(position,markerImage)
                markers.push(marker);

                // 이미지 마커
                // var markerImage = this.createMarkerImage(markerImageSrc, imageSize);   
                // var marker = this.createMarker(position, markerImage);  

                // marker.setMap(map);
                for (var j = 0; j < markers.length; j++) {  
                    markers[j].setMap(map);
                }  

                // 텍스트 마커
                // var customOverlay = new daum.maps.CustomOverlay({
                //     position: position,
                //     content: content
                // });

                // customOverlay.setMap(map);
            }

            return true;
        }
        console.log(nextProps.mapData);
        console.log(this.props.mapData);
        if (nextProps.mapData === this.props.mapData) { //조건 검색시 걸림.
            console.log("MapPage>shouldComponentUpdate>mapData change x>loading true");
            return true;
        }

        console.log("MapPage>shouldComponentUpdate>mapData change>false");

        const center = nextProps.mapData;

        // 이동할 위도 경도 위치를 생성
        var moveLatLon = new daum.maps.LatLng(center.latitude, center.longitude);

        // 지도 중심을 이동
        map.setCenter(moveLatLon);

        var bounds = map.getBounds();
        var cLatlng = map.getCenter(); // 가운데(center)
        var rtLatLng = bounds.getNorthEast(); //북동(right top)
        var lbLatLng = bounds.getSouthWest(); // 남서(left bottom)

        this.setBounds(cLatlng, rtLatLng, lbLatLng, "shouldComponentUpdate");

        return false;
    }

    // 지도 드래그 이동
    mapDrag = () => {
        var bounds = map.getBounds();
        var cLatlng = map.getCenter();
        var rtLatLng = bounds.getNorthEast(); //북동(right top)
        var lbLatLng = bounds.getSouthWest(); // 남서(left bottom)

        this.setBounds(cLatlng, rtLatLng, lbLatLng, "mapDrag");
    }

    // 지도 줌 변경
    mapZoom = () => {
        var bounds = map.getBounds();
        var cLatlng = map.getCenter();
        var rtLatLng = bounds.getNorthEast(); //북동(right top)
        var lbLatLng = bounds.getSouthWest(); // 남서(left bottom)

        this.setBounds(cLatlng, rtLatLng, lbLatLng, "mapZoom");
    }

    setBounds = (cLatlng, rtLatLng, lbLatLng, method) => {
        var str = "MapPage>setBounds>" + method;
        console.log(str);

        let data = [];

        data.push({
            rightTop: {
                latitude: rtLatLng.getLat(), //위도 y t
                longitude: rtLatLng.getLng() //경도 x r
            },
            leftBottom: {
                latitude: lbLatLng.getLat(), //위도 y b
                longitude: lbLatLng.getLng() //경도 x l
            },
            center: {
                latitude: cLatlng.getLat(), //위도 y 
                longitude: cLatlng.getLng() //경도 x 
            }
        });

        const options = this.props.optionData;
        if(options.length > 0){
            console.log("옵션있음 "+options);

            this.setState({
                mapInfo: data,
                optionDataList: [],
                optionCnt: options.length,
                optionApiCnt: 0
            });

            // 카테고리 api 호출
            this.kakaoCategorySearch();
        } else {
            console.log("옵션없음");
            // 부모 컴포넌트로 전달
            this.props.mapDataSet(data, options);
        }
    }

    //kakao 카테고리검색api 호출
    kakaoCategorySearch = async () => {
        var ps = new daum.maps.services.Places(map);

        const options = this.props.optionData;
        console.log("MapPage>categorySearch>"+options);
        for (var i = 0; i < options.length; i++) {
            await ps.categorySearch(options[i], this.categorySearchCB, { useMapBounds: true });
        }
    }

    //kakao 카테고리검색api 콜백함수
    categorySearchCB = (data, status, pagination) => {
        let { optionDataList } = this.state;
        let { optionCnt, optionApiCnt } = this.state;

        if (status === daum.maps.services.Status.OK) {
            console.log("MapPage>categorySearchCB>검색결과있음");
            for (var i = 0; i < data.length; i++) {
                optionDataList = optionDataList.concat([
                    {
                        latitude: data[i].y,
                        longitude: data[i].x
                    }
                ]);
            }
        } else if (status === daum.maps.services.Status.ZERO_RESULT) {
            console.log("MapPage>categorySearchCB>검색결과없음");
        } else if (status === daum.maps.services.Status.ERROR) {
            console.log("MapPage>categorySearchCB>검색결과오류");
        }

        if(optionCnt === (optionApiCnt+1)){
            console.log("같음 "+optionCnt+" "+(optionApiCnt+1)+"  "+data.length+"개 호출");

            this.setState({
                optionDataList: optionDataList
            });

            // 부모 컴포넌트로 전달
            this.props.mapDataSet(this.state.mapInfo, this.state.optionDataList);

        } else {
            console.log("다름 "+optionCnt+" "+(optionApiCnt+1)+"  "+data.length+"개 호출");

            this.setState({
                optionDataList: optionDataList,
                optionApiCnt: optionApiCnt+1
            });
        }
    }

    createMarker = (position, image) => {
        var marker = new daum.maps.Marker({
            position: position,
            image: image
        });

        return marker;
    }

    createMarkerImage = (src, size) => {
        var markerImage = new daum.maps.MarkerImage(src, size);
        return markerImage;
    }

    render() {
        let Loading;

        const loading = this.props.loading;
        console.log(loading);

        if(loading) {
            Loading = <img src="//s.zigbang.com/v1/web/search/loading2.gif" alt="" className="loadingShow"></img>
        } else {
            Loading = <img src="//s.zigbang.com/v1/web/search/loading2.gif" alt="" className="loadingHide"></img>
        }

        return (
            <div>
                <div id="map" className="mapStyle">
                {Loading}
                </div>
            </div>
        )
    }
}

export default MapPage;

//var housing=[], deal=[];

// for(var i=0;i<mapData.housingTypeData.length;i++){
//     housing[i] = mapData.housingTypeData[i].value;
// }

// for(var j=0;j<mapData.dealTypeData.length;j++){
//     deal[j] = mapData.dealTypeData[j].value;
// }

/* <div>
<h3>집 종류</h3>
{
    housing.map((type,i)=>{
        return(<p key={i}>{type}</p>)
    })
}
</div>
<div>
<h3>거래 방법</h3>
{
    deal.map((type,i)=>{
        return(<p key={i}>{type}</p>)
    })
}
</div>
<div>
<h3>지역 명</h3>
<p>{mapData.inputData}</p>
</div> */


/*
    //주소를 위도 경도로 바꿔줌
    laulonSearch = (data) => {
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new daum.maps.services.Geocoder();

        geocoder.addressSearch(data, (result, status) => {
            // 정상적으로 검색이 완료됐으면 
            if (status === daum.maps.services.Status.OK) {
                var coords = new daum.maps.LatLng(result[0].y, result[0].x);
                this.inputPosition(coords.jb, coords.ib);
                // optionDataList = optionDataList.concat([
                //     {
                //         latitude: String(coords.jb),
                //         longitude: String(coords.ib)
                //     }
                // ])
                // this.setState({
                //     optionDataList: optionDataList
                // })
                // console.log("hi",this.state)
            }

        });
    }
    //위도경도 optionDataList에 넣기, search.js로 연결
    inputPosition = (la, lo) => {
        let { optionDataList } = this.state;
        const { option } = this.state;
        optionDataList = optionDataList.concat([
            {
                latitude: String(la),
                longitude: String(lo)
            }
        ]);
        this.setState({
            optionDataList: optionDataList
        });
        //부모로 전달
        if (option.length === optionDataList.length) {
            this.props.optionDataSet(optionDataList);
        }

    }
*/