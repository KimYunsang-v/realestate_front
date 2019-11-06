import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import {
    Grid,
    Image,
    Segment,
    Icon,
    Card,
    Container
  } from 'semantic-ui-react'
import logo from '../../image/view_icon.png'
import homeBackGround from '../../image/home_image.jpg'
// import homeBanner from '../../image/home_banner.PNG'
import homeBanner from '../../image/dabang2.PNG'
import chart from '../../image/chart.png'

  var sectionStyle = {
    width: "100%",
    height: "660px",
    // backgroundImage: `url(${homeBackGround})`,
    // background : 'AliceBlue',
    marginTop : 0
  };

class Home extends Component{

    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render(){
        const { fixed } = this.state

        return(
          <div style={sectionStyle}> 
              <Grid columns={1} centered>
                  <Grid.Row>
                    {/* <Segment style={{width : '100%' , height : '400px'}}>
                      
                    </Segment> */}
                    <Image src={homeBanner} style={{width:'100%',  height : 300, marginTop: '70px'}}/>
                  </Grid.Row>
                  <Grid.Row columns = {3} centered>                    
                    <Grid.Column width={3} textAlign='center'>
                      <NavLink exact to="/chart" style={{color:'blue'}} >
                        <Segment basic>
                          {/* <Image src={chart}> */}
                            {/* <Icon name='chart line' size='massive'/> */}
                          {/* </Image> */}
                          <Segment style={{fontSize: 30, color:'black'}} basic>
                            {'<시세>'}
                          </Segment>                            
                        </Segment>
                      </NavLink>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='center'>
                      <NavLink exact to="/search" style={{color:'black'}} >
                        <Segment basic>
                          {/* <Image >
                            <Icon name='search' size='massive'/>
                          </Image> */}
                          <Segment style={{fontSize: 30, color:'black'}} basic>
                            {'<거래 매물>'}
                          </Segment>                            
                        </Segment>
                      </NavLink>         
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='center'>
                      <NavLink exact to="/community" style={{color:'black'}} >
                        <Segment basic>
                          {/* <Image >
                            <Icon name='comment alternate outline' size='massive'/>
                          </Image> */}
                          <Segment style={{fontSize: 30, color:'black'}} basic>
                            {'<커뮤니티 >'}
                          </Segment>                            
                        </Segment>
                      </NavLink>  
                    
                    </Grid.Column>
                  </Grid.Row>
              </Grid>            
            </div>
        );
    }
}

export default Home;