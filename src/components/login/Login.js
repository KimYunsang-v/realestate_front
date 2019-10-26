import React, { Component } from 'react';
import LoginForm from './LoginForm';
import * as service from '../../lib/LoginApi';

class Login extends Component {
  state={
    id:'',
    pw:'',
    // isLogin: sessionStorage.getItem("user")===null?false:true
  }
  
  signInListener = async(data)=>{
    try{
      console.log("getsignup",data[0])

      const logininfo = await service.getSignUp(data);

      console.log(logininfo);

      // sessionStorage.setItem("user", logininfo.data);
      
    //   if(logininfo.status === 200){
    //     this.setState({
    //       isLogin: true
    //     });
    //   }else {
    //     this.setState({
    //       isLogin: false
    //     });
    //   }      
    // }catch(e){
    //   console.log(e)
    }catch(e){
        console.log(e)
    }
  }
  
  signUpListener = async (data) => {

    try{
        console.log("postSingUpClient",data)
        const token = await service.postSingUpClient(data);
        this.props.setToken(token);
    }catch(e){
        console.log(e)
    }
  }

  logoutListener = () => {

    // this.setState({
    //   isLogin: false
    // });
  }

  render() {
    return (
      <div id="login">
        <LoginForm signInListener={this.signInListener} signUpListener={this.signUpListener} logoutListener={this.logoutListener}></LoginForm>
      </div>
    )
  }
}
export default Login;
