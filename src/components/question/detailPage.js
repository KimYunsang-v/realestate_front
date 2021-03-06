import React, { Component } from 'react';
import {Button, Segment, Container, Divider, Label, Icon, List, Input} from 'semantic-ui-react';

class detailPage extends Component {
    _isMounted = false
    state = {
        title: '',
        content: '',        
    }

    listBtnClickListener = () => {
        this.props.setMainComponent('listComponent');
    }

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
                <Button onClick = {() => this.listBtnClickListener()}>목록으로</Button>
                <Segment>
                        <Container textAlign='left' style={{fontSize:'20px'}}>{selectedPost.title}</Container>
                        <Container textAlign='right'>{selectedPost.registerDate}</Container>
                                            
                        <Container textAlign='left'>
                            <Label>
                                <Icon name='user'/>{selectedPost.author}
                            </Label>
                        </Container>
                        <Divider/>
                        <Container as='p' style={{height:'400px'}}>{selectedPost.content}</Container>                        
                            {answerList}

                        <Divider/>

                        <Input placeholder='댓글을 입력해주세요' value={inputData} onChange={(e) => this.inputChange(e)}/> 
                        <Button onClick={() => this.addAnswerBtnListener()}>댓글달기</Button>

                    </Segment>
            </Container>
        );
    }
}

export default detailPage;