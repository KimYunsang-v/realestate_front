import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import {
    Grid,
    Image,
    Segment,
  } from 'semantic-ui-react'
import homeBanner from '../../image/dabang4.PNG'
import building1 from '../../image/building1.jpg'
import building2 from '../../image/building2.jpg'
import building3 from '../../image/building3.jpg'
import building4 from '../../image/building4.jpg'

  var sectionStyle = {
    width: "100%",
    height: "660px",
    marginTop : 0
  };

class Home extends Component{

    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render(){

        return(
          <div style={sectionStyle}> 
              <Grid columns={1} centered>
                  <Grid.Row>
                    <Image src={homeBanner} style={{width:300,  height : 180, marginTop: '70px'}}/>
                  </Grid.Row>
                  <Grid.Row columns = {3} centered>                    
                    <Grid.Column width={3} textAlign='center'>
                      <NavLink exact to="/chart" style={{color:'blue'}} >
                        <Segment basic>
                          <Segment style={{fontSize: 30, color:'black'}} basic>
                            {'-시세-'}
                          </Segment>                            
                        </Segment>
                      </NavLink>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='center'>
                      <NavLink exact to="/search" style={{color:'black'}} >
                        <Segment basic>
                          <Segment style={{fontSize: 30, color:'black'}} basic>
                            {'-거래 매물-'}
                          </Segment>      
                        </Segment>
                      </NavLink>         
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='center'>
                      <NavLink exact to="/community" style={{color:'black'}} >
                        <Segment basic>
                          <Segment style={{fontSize: 30, color:'black'}} basic>
                            {'-커뮤니티-'}
                          </Segment>          
                        </Segment>
                      </NavLink>                      
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Image.Group>
                      <Image src = {building1} size = 'medium'/>
                      <Image src = {building2} size = 'medium'/>
                      <Image src = {building3} size = 'medium'/>
                      <Image src = {building4} size = 'medium'/>
                    </Image.Group>
                  </Grid.Row>
              </Grid>     
            </div>
        );
    }
}

export default Home;