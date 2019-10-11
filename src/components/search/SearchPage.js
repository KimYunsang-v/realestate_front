import React, { Component } from 'react';
import './SearchPage.css';
import { Input, Divider, Button, Dropdown, Popup, Grid, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import * as data from "./SearchImg"

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

const optionList = [{'school': '학교'}, {'subway':'지하철'}, 
                        {'hospital':'병원'}, {'cafe': '카페'}, {'culture':'문화시설'},
                        {'convenience': '편의점'}, {'mart': '대형마트'}, {'bank':'은행'} ];

const renderLabel = label =>({
    color:'blue',
    content :`${label.text}`
})

const renderLabel2 = label =>({
    color:'pink',
    content :`${label.text}`
})

class SearchPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            inputData: '',
            houseoptions,dealoptions,
            houses:'',deals:'',
            school : false,
            subway: false,
            hospital: false,
            cafe: false,
            culture: false,
            convenience: false,
            mart: false,
            bank: false,
            // optionList: [],
            unclicked: data.unclicked,
            clicked: data.clicked,
            sendTheme:[],
            optionCount:0,
            isOpen: false
        };
        this.keyPress = this.keyPress.bind(this);
    }

    keyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            this.searchClick()
        }
    }
    
    searchChange = (e) => {
        this.setState({
            inputData: e.target.value
        });
    }

    // 검색 버튼 이벤트
    searchClick = () => {
        // SearchPage에 선택한 조건을 부모 컴포넌트에 전달
        let data = [];
        let { inputData,houses,deals,sendTheme } = this.state;
        if(inputData!==''&& houses!=='' && deals!==''){
            data.push({
                housingTypeData: houses,
                dealTypeData: deals,
                inputData: inputData,
                options:sendTheme
            });
            // 부모 컴포넌트 (Search)로 전달
            this.props.searchDataSet(data);
        }else{
            alert("지역이름, 집타입, 거래타입을 모두 넣어주세요")
            return;
        }       
    };

    //house
    handleAddition = (e, { value }) => {
        this.setState({
         houseoptions: [{ text: value, value }, ...this.state.options],
        });
    }
    
    handleChange = (e, { value }) => {
        this.setState({ currentValues: value,houses:value })
    }

    //deal
    handleAdditionD = (e, { value }) => {
        this.setState({
         dealoptions: [{ text: value, value }, ...this.state.options],
        });
    }

    handleChangeD = (e, { value }) => {
        this.setState({ currentValuesD: value,deals:value })
    }

    //조건 선택 체크박스
    handleCheck = (event) => {
        var value = { value: event.target.value }

        this.setState(
            {
                value : !value
            }
        )
        
    }

    chooseTheme=()=>{
        //const { checked, checked1, checked2, checked3, checked4, checked5, checked6, checked7 } = this.state
        const {unclicked} = this.state
        var theme=[],count=0

        optionList.keys().map(item => {
            if(this.state[item] === true){
                theme = theme.concat(item);
                count++;
            }
        })

        this.setState({
            sendTheme:theme,
            optionCount:count,
            isOpen: false
        });
        console.log(theme);
        count=0;
    }

    popupBtnClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { checked, checked1, checked2, checked3, checked4, checked5, checked6, checked7,optionCount } = this.state
        const { unclicked, clicked } = this.state
        
        const option1 = ['school', 'subway', 'hospital', 'cafe'];
        
        const option2 = ['culture', 'convenience', 'mart', 'bank'];

        // const option1 = this.setOptionList(1);
        // const option2 = this.setOptionList(2);
        return (
            <div className="topDiv">
                <div className="searchDiv">
                    <Input size="big" icon='search' placeholder='지역이나 역명' onChange={this.searchChange} value={this.state.inputSearch} onKeyDown={this.keyPress} />

                    <Dropdown
                        options={this.state.houseoptions}
                        placeholder="집 타입"
                        search
                        selection
                        multiple
                        allowAdditions
                        onAddItem={this.handleAddition}
                        onChange={this.handleChange}
                        renderLabel={renderLabel}
                    />
                    <Dropdown
                        options={this.state.dealoptions}
                        placeholder="거래 타입"
                        search
                        selection
                        multiple
                        allowAdditions
                        onAddItem={this.handleAdditionD}
                        onChange={this.handleChangeD}
                        renderLabel={renderLabel2}
                    />

                <Popup open={this.state.isOpen} onOpen={this.popupBtnClick} onClose={this.popupBtnClick} trigger={<Button>조건 선택 ({optionCount>0?(<font>{optionCount}</font>):(<font>0</font>)})</Button>} position='bottom center' on='click' hideOnScroll>
                    <div className="popupDiv"></div>
                    <Grid centered divided columns={1}>
                        <Grid.Column textAlign='center'>
                            <ul className="imgUl">                                
                                 
                                {option1.map(item => {
                                    return(
                                    <li>
                                        <label className="theme1">
                                            <input type="checkbox" id= {item} value = {item} onChange={this.handleCheck} 
                                                defaultChecked={checked} />
                                            {checked ? (<Image src={clicked[item]} size="tiny" centered />) : (<Image src={unclicked[item]} size="tiny" centered />)}
                                            <span className="theme_name"> {optionList[item]} </span>
                                        </label>
                                    </li>
                                    )
                                })}
                            </ul>
                        </Grid.Column>
                    </Grid>
                    <Grid centered divided columns={1}>
                        <Grid.Column textAlign='center'>
                            <ul className="imgUl">
                            {option2.map(item => {
                                    return(
                                    <li>
                                        <label className="theme1">
                                            <input type="checkbox" id= {item} value = {item} onChange={this.handleCheck} 
                                                defaultChecked={checked} />
                                            {checked ? (<Image src={clicked[item]} size="tiny" centered/>) 
                                                            : (<Image src={unclicked[item]} size="tiny" centered/>)}
                                            <span className="theme_name"> {optionList[item]} </span>
                                        </label>
                                    </li>
                                    )
                                })}
                            </ul>
                            <Button onClick={this.chooseTheme}>선택</Button>
                        </Grid.Column>
                    </Grid>
                </Popup>

                <Button color="grey" onClick={this.searchClick}>검색</Button>

                </div>
                <Divider clearing />
                {/* <div className="radioDiv"><Checkbox label="아파트" onChange={this.apartChange} value="apart" /></div>
                    <div className="radioDiv"><Checkbox label="오피스텔" onChange={this.officetelChange} value="officetel" /></div>
                    <div className="radioDiv"><label className="b"><Checkbox label="주택" onChange={this.houseChagne} value="주택" /></label></div>

                    <div className="radioDiv"><Checkbox label="전세" onChange={this.leaseChagne} value="전세" /></div>
                    <div className="radioDiv"><Checkbox label="월세" onChange={this.monthChagne} value="월세" /></div>
                    <div className="radioDiv"><Checkbox label="매매" onChange={this.dealChagne} value="매매" /></div>  */}
           
            </div>
        );
    }
    
}

export default SearchPage;
         
// let hou = [], del = [];
        // let { checked1, checked2, checked3, checked4, checked5, checked6 } = this.state;
        // if (checked1 === "true") hou = hou.concat({ value: "apart" });
        // if (checked2 === "true") hou = hou.concat({ value: "officetel" });
        // if (checked3 === "true") hou = hou.concat({ value: "house" });
        // if (checked4 === "true") del = del.concat({ value: "lease" });
        // if (checked5 === "true") del = del.concat({ value: "deal" });
        // if (checked6 === "true") del = del.concat({ value: "month" });
        
// apartChange = (e, { value, checked }) => {
//     const { housingTypeData } = this.state;
//     if (checked === true) {
//         this.setState({
//             housingTypeData: housingTypeData.concat({   //지워도 되는데 아직 남겨둔거임
//                 value
//             }),
//             checked1: "true"
//         });

//     } else {
//         this.setState({
//             checked1: "false"
//         });
//     }
// }
// officetelChange = (e, { value, checked }) => {
//     const { housingTypeData } = this.state;

//     if (checked === true) {
//         this.setState({
//             housingTypeData: housingTypeData.concat({
//                 value
//             }), checked2: "true"
//         });

//     } else {
//         this.setState({
//             checked2: "false"
//         });
//     }
// }
// houseChagne = (e, { value, checked }) => {
//     const { housingTypeData } = this.state;
//     if (checked === true) {
//         this.setState({
//             housingTypeData: housingTypeData.concat({
//                 value
//             }), checked3: "true"
//         });

//     } else {
//         this.setState({
//             checked3: "false"
//         });
//     }
// }
// leaseChagne = (e, { value, checked }) => {
//     const { dealTypeData } = this.state;
//     if (checked === true) {
//         this.setState({
//             dealTypeData: dealTypeData.concat({
//                 value
//             }), checked4: "true"
//         });
//     } else {
//         this.setState({
//             checked4: "false"
//         });
//     }
// }
// dealChagne = (e, { value, checked }) => {
//     const { dealTypeData } = this.state;
//     if (checked === true) {
//         this.setState({
//             dealTypeData: dealTypeData.concat({
//                 value
//             }), checked5: "true"
//         });
//     } else {
//         this.setState({
//             checked5: "false"
//         });
//     }

// }
// monthChagne = (e, { value, checked }) => {
//     const { dealTypeData } = this.state;
//     if (checked === true) {
//         this.setState({
//             dealTypeData: dealTypeData.concat({
//                 value
//             }), checked6: "true"
//         });
//     } else {
//         this.setState({
//             checked6: "false"
//         });
//     }

// }