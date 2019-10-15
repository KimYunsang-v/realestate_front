import React, { Component } from 'react';
import { Modal, Button, Form, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import * as service from '../../lib/LoginApi';

class UserPage extends Component {
    state = {
        userid:'',
        userpw:'',
        username:'',
        open: false,
        key:''
    }
    
    handlechange = (input) => {
        this.setState({
            userpw: input.target.value
        })
    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false })

    componentDidMount() {
        var key = sessionStorage.getItem("user")
        var userid = sessionStorage.getItem("user").split(":")
        this.setState({
            userid: userid[0],
            username: userid[1],
            key:key
        })    
    }

    updateInfo = async() => {
        let data = []
        data.push({
            email:this.state.userid,
            name:"김윤상병신",
            password:this.state.userpw
        })
        //this.props.updateData(data)
        let key = this.state.key
        try{
            await service.putCient(data,key);
        }catch(e){
            console.log(e)
        }

        console.log("dd",this.state)

    }
    
    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        let userid = this.state.userid
        let username = this.state.username
        return (
            <div>
                <h1>비밀번호 수정</h1>
                <Button onClick={this.closeConfigShow(true, false)}>정보 수정</Button>

                <Modal
                    size="tiny"
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                >
                    <Modal.Header>정보 수정</Modal.Header>
                    <Modal.Content>
                        <p>회원 정보 수정</p>
                        <Form>
                            <Segment stacked>
                                <Form.Input disabled fluid icon='user' iconPosition='left'
                                    name="id" value={userid}  />
                                <Form.Input disabled fluid icon='user' iconPosition='left'
                                    name="name" value={username}  />
                                <Form.Input
                                    fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                                    name="pw" value={this.state.pw} onChange={this.handlechange}
                                />
                                <Button color='teal' fluid size='large' onClick={this.updateInfo}>
                                    확인
                                </Button>
                            </Segment>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative>
                            안해
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default UserPage;