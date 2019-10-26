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
import Login from '../login/Login'

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
            <Segment style={sectionStyle}>
                <Segment style={{width : 300, float: "right", marginTop: 100, marginRight: 50}} >
                  <Login > </Login>
                </Segment>
            </Segment>
        );
    }
}

export default Home;