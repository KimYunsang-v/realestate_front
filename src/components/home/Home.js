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
    GridColumn,
  } from 'semantic-ui-react'
import homeBackGround from '../../image/home_image.jpg'
import Login from '../login/Login'

  var sectionStyle = {
    width: "100%",
    height: "650px",
    backgroundImage: `url(${homeBackGround})`,
    marginTop : 0
  };

class Home extends Component{

    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render(){
        const { fixed } = this.state

        return(
                <Segment style={sectionStyle} floated={"left"}>
                  <Segment style={{width : 350, height: 450,float: "right", marginTop: 100, marginRight: 50}} >
                    <Login > </Login>
                  </Segment>
                </Segment>
        );
    }
}

export default Home;