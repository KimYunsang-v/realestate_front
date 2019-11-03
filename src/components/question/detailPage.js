import React, { Component } from 'react';
import { Table, Comment, Button, Segment, Form, TextArea, Grid, Header, Container, Divider, Label, Icon, List, Input} from 'semantic-ui-react';

class detailPage extends Component {
    _isMounted = false
    state = {
        title: '',
        content: '',        
    }

    componentDidMount() {
       // this.setData()
        // this._isMounted = true
    }

    componentWillUnmount() {
        // this._isMounted = false
        // this.setData()
    }
    
    // setData = () => {
    //     const detailBoardItems = this.props
    //     console.log(detailBoardItems)
    //     if(this._isMounted){
    //         this.setState({
    //             title: detailBoardItems.title,
    //             content: detailBoardItems.content
    //         })
    //     }
    // }

    inputChange = (e) => {
        console.log(e.target.value)
        this.setState({
            inputData : e.target.value
        })
    }

    addAnswerBtnListener = () => {
        const {selectedPost} = this.props;
        console.log(this.state.inputData)
        const data = {
            author : this.props.user,
            boardNo: selectedPost.no,
            content: this.state.inputData
        }
        this.props.replySubmit(data);

        this.setState({
            inputData : '',
        })
    }
    
    render() {
        const {selectedPost}  = this.props;
        const {inputData} = this.state;

        var answerList ='';
        if(selectedPost.answers){
            answerList = selectedPost.answers.map(answer => {
                return (
                        <Container>
                            <Divider></Divider>
                            <List divided>
                                <List.Item>
                                    {answer.content}
                                </List.Item>
                            </List>     
                        </Container>
                )
            })
        }
        console.log(selectedPost)
        return (   
            <Container>     
                <Segment>
                        <Container textAlign='left' style={{fontSize:'20px'}}>{selectedPost.title}</Container>
                        <Container textAlign='right'>{selectedPost.registerDate}</Container>
                                            
                        <Container textAlign='left'>
                            <Label>
                                <Icon name='user'/>{selectedPost.author}
                            </Label>
                        </Container>
                        <Divider/>
                    
                    {/* <Segment style={{height : '400px'}}> */}
                        <Container as='p' style={{height:'400px'}}>{selectedPost.content}</Container>                        
                            {answerList}

                        <Divider/>

                        <Input placeholder='댓글을 입력해주세요' value={inputData} onChange={(e) => this.inputChange(e)}/> 
                        <Button onClick={() => this.addAnswerBtnListener()}>댓글달기</Button>

                    </Segment>
            </Container>




            // <Table>
            //     <Table.Header>
            //         {this.title}
            //     </Table.Header>
            //     <Table.Body>
            //         {this.content}
            //         <Comment></Comment>
            //     </Table.Body>
            //     <Table.Footer>
            //         <Button>뒤로가기</Button>
            //     </Table.Footer>
            // </Table>
        );
    }
}

export default detailPage;