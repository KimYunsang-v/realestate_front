import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Menu, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Menu.css';
import logo from '../../image/view_icon.png'

class Navigator extends Component {

    state = {
        activeItem : 'home'
    }    

    clickLogoutBtn = () =>{ 
        var result = window.confirm("정말 로그아웃 하시겠습니까?");
        if(result){
            window.$loginInfo = '';
            this.setState({
                activeItem : 'logout'
            })
        }else{
            return;
        }        
    }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { fixed } = this.state

        console.log(window.$loginInfo)

        var loginBtn ='';
        if(window.$loginInfo === '') {
            loginBtn = (
                <NavLink exact to="/login" style={{marginRight: 150}}>
                    <Menu.Item  name='login' style={{margin:0}} onClick={this.handleItemClick} >    
                        로그인                                    
                    </Menu.Item>
               </NavLink>
            )
        } else {
            loginBtn = (
                <NavLink exact to="/" style={{marginRight: 150}}>
                    <Menu.Item  name='login' style={{margin:0}} onClick={this.clickLogoutBtn}  position = 'right'>    
                        로그아웃
                </Menu.Item>
               </NavLink>
            )
        }
        return(
                    <Menu
                        fixed={fixed ? 'top' : null}
                        pointing
                        secondary
                        style={{margin: 0}}
                        size='large'
                    >
                                <Menu.Item style={{padding:0, marginLeft: 50, marginRight:20}}>
                                    <Image src={logo} style={{width:150, height:50}}  position = 'left'/>
                                </Menu.Item>

                            <NavLink exact to="/" > 
                                <Menu.Item name='home' onClick={this.handleItemClick} 
                                    style={{marginRight:20, textlAlign: 'bottom'}}  position = 'right'>
                                    Home       
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/chart"> 
                                <Menu.Item name='chart' style={{marginRight:20, textlAlign: 'bottom'}} onClick={this.handleItemClick}  position = 'right'>                 
                                    시세
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/search">  
                                <Menu.Item  name='search' style={{marginRight:20}} onClick={this.handleItemClick}  position = 'right'>
                                    거래 정보                                  
                                </Menu.Item>
                            </NavLink>
                            <NavLink exact to="/community" >
                                <Menu.Item name='community' style={{marginRight:20}} onClick={this.handleItemClick}  position = 'right'>
                                    커뮤니티          
                                </Menu.Item>
                            </NavLink>
                                {loginBtn}
                    </Menu>
        )
    }
};

export default Navigator;