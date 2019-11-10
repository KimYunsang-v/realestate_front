import React, { Component } from 'react';
import { Modal, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class LoginForm extends Component {
  state = {
    id: '',
    name:'',
    pw: '',
    pwCheck: '',
    open: false
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }
  
  close = () => this.setState({ open: false })

  handlechangeListener = (input) => {
    this.setState({
      [input.target.name]: input.target.value
    })
  }

  loginBtnEventListener = () => {
    const data = [];
    data.push({
        userId: this.state.id,
        password: this.state.pw
    });
    this.props.signInListener(data);
  }

  signUpBtnListener=()=>{
    console.log("회원가입 완료>",this.state)
    const data = [];

    data.push({
        email: this.state.id,
        name: this.state.name,
        password: this.state.pw
    });

    this.props.signUpListener(data)
    this.close()
  }

  logoutBtn = () => {
    // sessionStorage.clear();
    this.props.logoutListener();
  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    return (
        <Segment>
            <Grid textAlign='center' style={{ margin: '1rem', height: '100%' }} verticalAlign='top'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        로그인
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
                                                    name="id" value={this.state.id} onChange={this.handlechangeListener} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name="pw"
                                value={this.state.pw} onChange={this.handlechangeListener}
                            />
                            <Button color='teal' fluid size='large' onClick={this.loginBtnEventListener}>
                                로그인
                            </Button>
                        </Segment>
                    </Form>
                <Message>
                  <Button onClick={this.closeConfigShow(true, false)}>가입하기</Button>
                </Message>
              </Grid.Column>
            </Grid>

            {/*회원가입 */}
            <Modal
                size="tiny"
                open={open}
                closeOnEscape={closeOnEscape}
                closeOnDimmerClick={closeOnDimmerClick}
                onClose={this.close}
            >
                <Modal.Header>회원가입</Modal.Header>
                <Modal.Content>
                    <p>가입하세여t</p>
                    <Form>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
                                    name="id" value={this.state.id} onChange={this.handlechangeListener} />
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='User name'
                                    name="name" value={this.state.name} onChange={this.handlechangeListener} />
                            <Form.Input
                                    fluid icon='lock' iconPosition='left' placeholder='Password' type='password' 
                                    name="pw" value={this.state.pw} onChange={this.handlechangeListener}
                            />                            
                            <Form.Input
                                    fluid icon='lock' iconPosition='left' placeholder='Password Check' type='password' 
                                    name="pwCheck" value={this.state.pwCheck} onChange={this.handlechangeListener}
                            />
                            <Button color='teal' fluid size='large' onClick={this.signUpBtnListener}>
                                아주 간단한 회원가입
                            </Button>
                        </Segment>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.close} negative>
                        취소
                    </Button>
                </Modal.Actions>
            </Modal>

        </Segment>
    )
  }
}
export default LoginForm;