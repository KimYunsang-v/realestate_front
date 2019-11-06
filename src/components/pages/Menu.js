import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Menu, Container, Segment, Image } from 'semantic-ui-react';
import { RouteComponentProps, withRouter } from 'react-router'
import 'semantic-ui-css/semantic.min.css';
import './Menu.css';
import logo from '../../image/view_icon.png'

class Navigator extends Component {

    state = {
        activeItem : 'home'
    }    

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { fixed } = this.state
        const { activeItem } = this.state
        return(
            // <Segment
            //         textAlign='center'
            //         // style={{ minHeight: 30, padding: '1em 0em' }}
            //         vertical
            //     >
                    <Menu
                        fixed={fixed ? 'top' : null}
                        pointing
                        secondary
                        style={{margin: 0}}
                        size='large'
                    >
                            {/* <NavLink exact to="/">  */}
                                <Menu.Item style={{padding:0, marginLeft: 50, marginRight:20}} 
                                    // position='left'
                                    >
                                    <Image src={logo} style={{width:150, height:50}}/>
                                </Menu.Item>
                            {/* </NavLink> */}

                            <NavLink exact to="/" > 
                                <Menu.Item name='home' onClick={this.handleItemClick} 
                                    style={{marginRight:20, textlAlign: 'bottom'}}
                                // position='center'
                                >
                                    Home       
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/chart"> 
                                <Menu.Item name='chart' style={{marginRight:20, textlAlign: 'bottom'}} onClick={this.handleItemClick} 
                                // position='right'
                                >                                     
                                    시세
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/search">  
                                <Menu.Item  name='search' style={{marginRight:20}} onClick={this.handleItemClick} 
                                // position='right'
                                >
                                    거래 매물                                  
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/community">
                                <Menu.Item name='community' style={{marginRight:20}} onClick={this.handleItemClick} 
                                // position='right'
                                >
                                    커뮤니티          
                                </Menu.Item>
                            </NavLink>
                            
                            <NavLink exact to="/login" style={{marginRight: 150}}>
                                <Menu.Item  name='login' style={{margin:0}} onClick={this.handleItemClick} 
                                // active={activeItem === 'login'}
                                // position='right'
                                >    
                                     로그인                                    
                                </Menu.Item>
                            </NavLink>
                    </Menu>
        )
    }
};

export default Navigator;