import React, { Component } from 'react';
import { QuestionList } from './';
import * as service from '../../lib/boardApi';
import { Modal, Button, Comment, Header, Form, Divider, Segment, Grid } from 'semantic-ui-react';
import RegionTreeView from './RegionTreeView';

class Community extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            // pageOfItems: [],
            detailBoardItems: {
                title: '',
                content: '',
                author: '',
                no: 0,
                answers: [],
                registerDate: ''
            },
            open: false,
            closeOnDimmerClick: true,
            inputData: '',
            user:'',
            city: '',
            district: '',
            page: 1
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    // 모달 닫기
    close = () => this.setState({open: false})

    onChangePage(page) {
        // Pagination 페이지 이동 시 데이터 셋팅
        this.setState({ page: page });
    }

    // setCity = (city) => {
    //     this.setState({city : city})
    // }

    // setDistrict = (district) => {
    //     this.setState({district : district})
    // }

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
    }

    // 게시판 데이터 get
    getBoardData = async (city, district) => {
        const {page} = this.state
        this.setState({
            city : city,
            district : district
        })
        try{
            console.log("getBoard");
            const responseInfo = await service.getBoard(city, district, page);
            console.log("responseInfo", responseInfo);
            this.setState({
                dataList : responseInfo.data,
            });
        } catch (e) {
            console.log(e);
        }
    }

    // 게시글 세부 내용 데이터 get
    detailBoardData = (data) => {
        try{
            console.log("getDatailBoard")
            //const detailInfo = await service.getDetailBoard(boardNo);
            // console.log(detailInfo.data)
            this.setState({
                detailBoardItems : data,
                open: true,
                closeOnDimmerClick: false
            });
        }catch(e){
            console.log(e)
        }
    }

    // 댓글 내용 입력 시
    inputChange = (e) => {
        this.setState({
            inputData: e.target.value
        })
    }

    // 댓글 post
    replySubmit = async () => {
        try{
            const {no} = this.state.detailBoardItems
            const data = []
            const {inputData} = this.state
            if(inputData !== ''){
                data.push({
                    author: this.state.user,
                    boardNo: no,
                    content: inputData
                });
                await service.postNewReply(data)
                this.detailBoardData(no);   //리로딩
            }
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
        data[0]['city'] = this.state['city'];
        data[0]['district'] = this.state['district'];
        console.log(data)
        await service.postNewContent(data);
       // this.boardData();   //리로딩
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
        const {title, content, answers} = this.state.detailBoardItems
        const {open, closeOnDimmerClick} = this.state
        return (
            <Segment>
            <Grid columns={2}>
                <Grid.Column width={3}>
                    <Segment>
                        <RegionTreeView getBoardData={this.getBoardData}/>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={13}>
                    <QuestionList
                        handleSubmit={this.handleSubmit}
                        // boardData={this.state}
                        items={this.state.dataList}
                        onChangePage={this.onChangePage}
                        detailBoardData={this.detailBoardData}
                        user = {this.state.user}
                    />
                </Grid.Column>

                <Modal
                    open={open}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                >
                    <Modal.Header>
                        {title}
                    </Modal.Header>
                    <Modal.Content>
                        {content}
                    </Modal.Content>
                    <Modal.Content>
                        <Divider/>
                        <Comment.Group>
                            <Header> Comments </Header>
                                {
                                    // answers.map( (contact,i) => {
                                    //     return (
                                    //         <Comment key={i}>
                                    //             <Comment.Content>
                                    //                 <Comment.Author as='a'>{contact.author}</Comment.Author>
                                    //                 <Comment.Metadata>{contact.registerDate}</Comment.Metadata>
                                    //                 <Comment.Text>{contact.content}</Comment.Text>
                                    //             </Comment.Content>
                                    //             <Comment.Actions>
                                    //                 <Comment.Action onClick={this.replyDelete.bind(this,contact.no)}>delete</Comment.Action>
                                    //                 {/* delete */}
                                    //             </Comment.Actions>
                                    //         </Comment> 
                                    //     );
                                    // })
                                }
                            <Form reply>
                                <Form.TextArea onChange={this.inputChange} 
                                                value={this.state.inputData}/>
                                <Button 
                                    content='Add Reply' 
                                    labelPosition='left' 
                                    icon='edit'
                                    primary 
                                    onClick={this.replySubmit}
                                />
                            </Form>
                        </Comment.Group>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button icon='trash' negative onClick={this.handleDelete} />
                        <Button onClick={ this.close } primary>뒤로가기</Button>
                    </Modal.Actions>
                </Modal>
            </Grid> 
            </Segment>
        )
    }
}

export default Community; 