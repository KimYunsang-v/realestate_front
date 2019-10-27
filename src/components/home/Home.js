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
    
  };

class Home extends Component{

    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render(){
        const { fixed } = this.state

        return(
            <Segment>
            {/* // <Segment style={sectionStyle}> */}
                <Grid columns={2}>
                  <Grid.Column>
                    <Grid.Row>
                      <Segment>
                        차트 보러가자!
                      </Segment>
                    </Grid.Row>
                    <Grid.Row>
                    <Segment>
                        검색 하러가자!
                      </Segment>
                    </Grid.Row>
                    <Grid.Row>
                    <Segment>
                        질문 하러가자!
                      </Segment>
                    </Grid.Row>
                  </Grid.Column>

                  <Grid.Column>
                  <Login > </Login>  

                  </Grid.Column>
                </Grid>
                  {/* <Segment style={{width : 300, float: "right", marginTop: 100, marginRight: 50}} >
                  <Login > </Login>
                </Segment> */}
            </Segment>
        );
    }
}

export default Home;