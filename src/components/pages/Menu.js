import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Menu, Container, Segment, Image } from 'semantic-ui-react';
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
                        // size='large'
                    >
                            {/* <NavLink exact to="/">  */}
                                <Menu.Item style={{padding:0, marginLeft: 70}} position='left'>
                                    <Image src={logo} style={{width:150, height:50}}/>
                                </Menu.Item>
                            {/* </NavLink> */}

                            <NavLink exact to="/"> 
                                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} position='right'>
                                    Home       
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/chart"> 
                                <Menu.Item name='chart' style={{margin:0, textlAlign: 'bottom'}} active={activeItem === 'chart'} onClick={this.handleItemClick} position='right'>                                     
                                    시세          
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/search">  
                                <Menu.Item  name='search' style={{margin:0}} active={activeItem === 'search'} onClick={this.handleItemClick} position='right'>
                                    거래 매물                                  
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/question">
                                <Menu.Item name='question' style={{margin:0}} active={activeItem === 'question'} onClick={this.handleItemClick} position='right'>                                    
                                    커뮤니티                                    
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/login" style={{marginRight: 150}}>
                                <Menu.Item  name='login' style={{margin:0}} active={activeItem === 'login'} onClick={this.handleItemClick} position='right'>                                
                                     로그인                                    
                                </Menu.Item>
                            </NavLink>
                    </Menu>
        )
    }
};

export default Navigator;