import React, { Component } from 'react';
import LoginPage from '../login/LoginPage';
import * as service from '../../lib/LoginApi';

class Login extends Component {
  state={
    id:'',
    pw:'',
    isLogin: sessionStorage.getItem("user")===null?false:true
  }
  
  usingIdPw = async(data)=>{
    try{
      console.log("getsignup",data[0])
      const logininfo = await service.getSignUp(data);
      console.log(logininfo);
      sessionStorage.setItem("user", logininfo.data);
      
      if(logininfo.status === 200){
        this.setState({
          isLogin: true
        });
      }else {
        this.setState({
          isLogin: false
        });
      }
      
    }catch(e){
      console.log(e)
    }
  }
  
  signUp = async (data) => {
    try{
        console.log("postSingUpClient",data)
        await service.postSingUpClient(data);
    }catch(e){
        console.log(e)
    }
  }
  logout = () => {
    this.setState({
      isLogin: false
    });
  }

  render() {
    return (
      <div>
        <LoginPage usingIdPw={this.usingIdPw} signUp={this.signUp} isLogin={this.state.isLogin} logout={this.logout}></LoginPage>
      </div>
    )
  }
}
export default Login;
