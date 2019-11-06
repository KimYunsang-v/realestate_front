import React, { Component } from 'react';
import { Table, Comment, Button, Segment, Form, TextArea, Label, Message, Container, Input, Grid, Header } from 'semantic-ui-react';


class editPage extends Component {
    _isMounted = false
    state = {
        title: '',
        content: '',        
    }

    onChangeListener = (e, name) => {
        this.setState({
            [name] : e.target.value
        })
    }

    listBtnClickListener = () => {
        this.props.setMainComponent('listComponent');
    }
    
    saveBtnOnClickListener = () => {
        const data = {
            title: this.state.title,
            content : this.state.content,
            author : this.props.user,
            city : this.props.city,
            district : this.props.district
        }

        console.log(data)

        this.props.handleSubmit(data);
    }

    setData = () => {
        const detailBoardItems = this.props
        console.log(detailBoardItems)
        if(this._isMounted){
            this.setState({
                title: detailBoardItems.title,
                content: detailBoardItems.content
            })
        }
    }
    
    render() {
        const {user} = this.props;

        return (
            <Container>
                <Message
                    attached
                    header={user + '님!'}
                    content='게시글을 작성해주세요!!'
                    />
                <Segment>
                    <Input placeholder='제목을 입력해주세요' value={this.state.title} onChange={(e) =>this.onChangeListener(e, 'title')}/>                   
                    <Header/>
                    <Form >
                        <TextArea label='내용' placeholder='내용을 입력해주세요' value={this.state.content} 
                                onChange={(e) =>this.onChangeListener(e, 'content')} style={{height: 300}}/>
                    </Form>

                    <Header/>

                    <Button onClick = {() => this.listBtnClickListener()}>뒤로가기</Button>
                    <Button onClick={() => this.saveBtnOnClickListener()}>저장</Button>
                </Segment>
            </Container>
        );
    }
}

export default editPage;