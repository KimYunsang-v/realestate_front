import React,{Component} from 'react';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react'
import homeBackGround from '../../image/home_image.jpg'
import LoginForm from '../login/LoginPage'



  var sectionStyle = {
    width: "100%",
    height: "650px",
    backgroundImage: `url(${homeBackGround})`,
    
  };

class Home extends Component{

    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })


    render(){
        const { fixed } = this.state

        return(
            <section style={sectionStyle}>
                <Segment style={{width : 300, float: "right", marginTop: 100, marginRight: 50, }} >
                <LoginForm   style={{opacity: 0.5}}> </LoginForm>
                </Segment>
                
            </section>
        );
    }
}

export default Home;