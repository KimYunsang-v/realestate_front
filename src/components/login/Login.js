import React  from 'react';
import LoginForm from './LoginForm';
import * as service from '../../lib/LoginApi';

class Login extends React.Component {
  state={
    id:'',
    pw:'',
    loginInfo : {
      name : '',
      jwt : '',
    },
  }
  
  signInListener = async(data)=>{
    try{
      console.log("getsignup",data[0])

      const logininfo = await service.getSignUp(data);

      console.log(logininfo);

      this.setState({
        loginInfo : {
          name : data[0]['userId'],
          jwt : logininfo.data,
        }
      })

      // let history = useHistory();
      window.$loginInfo = this.state.loginInfo;

      this.props.history.push('/');

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
    window.$loginInfo = '';
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
