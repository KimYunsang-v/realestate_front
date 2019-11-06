import React, { Component } from 'react';
import { QuestionList, EditPage, DetailPage } from './';
import * as service from '../../lib/boardApi';
import { Modal, Button, Comment, Header, Form, Divider, Segment, Grid, Container } from 'semantic-ui-react';
import RegionTreeView from './RegionTreeView';
import { district } from '../chart/SelectData';

class Community extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            open: false,
            closeOnDimmerClick: true,
            inputData: '',
            user:'',
            city: '',
            district: '',
            page: 1,
            mainComponent: 'listComponent',
            selectedPost : '',
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    // 모달 닫기
    close = () => this.setState({open: false})

    onChangePage(page) {
        // Pagination 페이지 이동 시 데이터 셋팅
        this.setState({ page: page });
    }

    componentDidMount() {
        var userid=''
        // if(sessionStorage.getItem("user")===null){
        //     alert("로그인 후 이용할 수 있습니다.");
        //     this.props.history.push("/login");
        // }else{
            //userid=sessionStorage.getItem("user").split(":")
            userid="윤상"
            this.setState({
                user:userid[0]
            })
            // this.boardData()
        // }
        this.componentChangeListener("listComponent", "");
    }

    componentChangeListener = () => {
        const {mainComponent, city, district} = this.state;

        if(mainComponent === 'editComponent'){            
            return( 
                <Grid.Column width={13}>
                    <EditPage city={this.state.city} district={this.state.district} user={this.state.user} handleSubmit={this.handleSubmit} setMainComponent = {this.setMainComponent}/>                
                </Grid.Column>
             )
        } else if (mainComponent === 'detailComponent') {
            return( 
                <Grid.Column width={13}>
                    <DetailPage user = {this.state.user} selectedPost={this.state.selectedPost} replySubmit = {this.replySubmit} setMainComponent = {this.setMainComponent}/>
                </Grid.Column>
             )
        } else if (mainComponent === 'listComponent') {
            
            return( 
                <Grid.Column width={13}>    
                    <Button color="olive" onClick = {() => this.setMainComponent('editComponent')} style={{marginBottom: 10}}> 글쓰기 </Button>                
                    <QuestionList
                        handleSubmit={this.handleSubmit}
                        // boardData={this.state}
                        items={this.state.dataList}
                        onChangePage={this.onChangePage}
                        listClickEvent = {this.listClickEvent}
                        //detailBoardData={this.detailBoardData}
                        user = {this.state.user}/>
                </Grid.Column>                
             )
        } else {
            return null;
        }
    }

    setMainComponent = (component) => {
        const {city, district} = this.state;
        if(component === 'editComponent' && !city || !district){
            return alert('지역을 선택해주세요')
        }
        this.setState({
            mainComponent : component
        })
    }

    listClickEvent = (data) => {
        this.setState({
            selectedPost : data,
            mainComponent : 'detailComponent',
        })
    }

    // 게시판 데이터 get
    getBoardData = async (city, district) => {
        const page = this.state.page
        this.setState({
            city : city,
            district : district,
        })
        console.log(city, district, page);
        try{
            console.log("getBoard");
            const responseInfo = await service.getBoard(city, district, page);
            console.log("responseInfo", responseInfo);
            this.setState({
                mainComponent : 'listComponent',
                dataList : responseInfo.data,
            });
        } catch (e) {
            console.log(e);
        }
    }

    // 댓글 내용 입력 시
    inputChange = (e) => {
        this.setState({
            inputData: e.target.value
        })
    }

    // 댓글 post
    replySubmit = async (data) => {
        try{
            const response = await service.postNewReply(data);
            console.log(response.data)
            this.setState({
                selectedPost : response.data,
                mainComponent : 'detailComponent'
            })
            //this.detailBoardData(no);   //리로딩
            
        }catch(e){
            console.log(e)
        }
        this.setState({
            inputData: ''
        })
    }

    // 댓글 삭제
    replyDelete = async (answerNo) => {
        try{
            const {no} = this.state.detailBoardItems
            const answers = this.state.detailBoardItems.answers
            for(let i of answers){      //댓글 삭제 시 작성자 비교
                if(answerNo === i.no){
                    if(this.state.user === i.author){
                        await service.postDeleteReply(answerNo)
                        this.detailBoardData(no)
                        break
                    }else{
                        alert("권한이 없습니다.")
                        break
                    }
                }
            }
        }catch(e) {
            console.log(e)
        }
    }

    //새로운 게시글 post
    handleSubmit = async (data) => {        
        console.log(data)
        const responseInfo = await service.postNewContent(data);
        console.log(responseInfo)
        this.setState({
            dataList : responseInfo.data,
            mainComponent : 'listComponent'
        })
        //this.getBoardData();   //리로딩
    }

    // 게시글 삭제 post
    handleDelete = async () => {
        try{
            const {no,author} = this.state.detailBoardItems
            if(this.state.user === author){ //게시글 삭제 시 작성자 비교
                await service.deleteContent(no);
                this.boardData();   //리로딩
            }else{
                alert("권한이 없습니다.")
            }
        }catch(e){
            console.log(e)
        }
    }
    
    render() {
        const style1 = {
            margin: '5rem 16rem 16rem'
        };
        const {open, closeOnDimmerClick} = this.state


        var mainComponent = this.componentChangeListener();
        

        return (
            <Segment>
            <Grid columns={2}>
                <Grid.Column width={3}>
                    <Segment>
                        <RegionTreeView getBoardData={this.getBoardData}/>
                    </Segment>
                </Grid.Column>
                    {mainComponent}
            </Grid> 
            </Segment>
        )
    }
}

export default Community; 