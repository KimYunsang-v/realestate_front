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
                        size='large'
                    >
                        <Container inverted>
                            {/* <NavLink exact to="/">  */}
                                <Menu.Item style={{padding:0}} position='left'>
                                    <Image src={logo} style={{width:150, height:50}}/>
                                </Menu.Item>
                            {/* </NavLink> */}

                            <NavLink exact to="/"> 
                                <Menu.Item as='a' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} position='right'>
                                    Home                                    
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/chart"> 
                                <Menu.Item as='a' name='chart' style={{margin:0, textlAlign: 'bottom'}} active={activeItem === 'chart'} onClick={this.handleItemClick} position='right'>                                     
                                    차트                    
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/search">  
                                <Menu.Item as='a'  name='search' style={{margin:0}} active={activeItem === 'search'} onClick={this.handleItemClick} position='right'>
                                    검색                                    
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/question">
                                <Menu.Item as='a' name='question' style={{margin:0}} active={activeItem === 'question'} onClick={this.handleItemClick} position='right'>                                    
                                    질문                                    
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/login">
                                <Menu.Item as='a' name='login' style={{margin:0}} active={activeItem === 'login'} onClick={this.handleItemClick} position='right'>                                
                                     로그인                                    
                                </Menu.Item>
                            </NavLink>
                            {/* <Menu.Item position='right'>
                                <Button as='a' inverted={!fixed}>
                                    Log in
                                </Button>
                                <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                                    Sign Up
                                </Button>
                            </Menu.Item> */}
                        </Container>
                    </Menu>
        //   </Segment>
            // <div className="Navigator">
            // <div className="Navigator_position">
            //         <NavLink exact to="/chart"> 
            //             <Button color="blue">그래프</Button>
            //         </NavLink>
            //         <NavLink exact to="/search/">
            //             <Button color ="violet">검색</Button>
            //         </NavLink>
            //         <NavLink exact to="/question">
            //             <Button color="purple">질문</Button>
            //         </NavLink>
            //         {/* <NavLink exact to="/search/foo">
            //             <Button color="purple">질문</Button>
            //         </NavLink> */}
            //         <NavLink exact to="/login">
            //             <Button color="pink">로그인</Button>
            //         </NavLink>
            //     </div>
            // </div>
        )
    }
};

export default Navigator;