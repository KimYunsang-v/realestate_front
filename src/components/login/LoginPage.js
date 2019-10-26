import React, { Component } from 'react';
import { Modal, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import UserPage from '../userPage/UserPage';

class LoginPage extends Component {
  state = {
    id: '',
    name:'',
    pw: '',
    open: false
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }
  
  close = () => this.setState({ open: false })

  handlechange = (input) => {
    this.setState({
      [input.target.name]: input.target.value
    })
  }
  loginBtn = () => {
    const data = [];
    data.push({
        email: this.state.id,
        password: this.state.pw
    });
    this.props.usingIdPw(data);

    // this.setState({
    //   id: '',
    //   name:'',
    //   pw: '',
    // })
    
  }
  signUP=()=>{
    console.log("회원가입 완료>",this.state)
    const data = [];
    data.push({
        email: this.state.id,
        name: this.state.name,
        password: this.state.pw
    });
            
    this.props.signUp(data)
    alert("회원가입이 완료 되었습니다.")
    this.close()
  }

  logoutBtn = () => {
    sessionStorage.clear();
    this.props.logout();
  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state
    const isLogin = this.props.isLogin;

    return (
      <div>
        {isLogin ? (
          <div>
            <h1>환영합니다.</h1>
            <UserPage userInfo ={this.state}/>
            <Button color='olive' onClick={this.logoutBtn}>로그아웃</Button>
          </div>
        ) : (
          <div className='login-form' >
            <style>{`
                  body > div,
                  body > div > div,
                  body > div > div > div.login-form {
                  height: 90%;}`}
            </style>
            <Grid textAlign='center' style={{ margin: '1rem', height: '100%' }} verticalAlign='top'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                  로그인
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
                      name="id" value={this.state.id} onChange={this.handlechange} />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      name="pw"
                      value={this.state.pw} onChange={this.handlechange}
                    />
                    <Button color='teal' fluid size='large' onClick={this.loginBtn}>
                      로그인
                        </Button>
                  </Segment>
                </Form>
                <Message>
                  <Button onClick={this.closeConfigShow(true, false)}>가입하기</Button>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        )}
        
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
                    name="id" value={this.state.id} onChange={this.handlechange} />
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='User name'
                    name="name" value={this.state.name} onChange={this.handlechange} />
                  <Form.Input
                    fluid icon='lock' iconPosition='left' placeholder='Password' type='password' 
                    name="pw" value={this.state.pw} onChange={this.handlechange}
                  />
                  <Button color='teal' fluid size='large' onClick={this.signUP}>
                   아주 간단한 회원가입
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
    )
  }
}
export default LoginPage;