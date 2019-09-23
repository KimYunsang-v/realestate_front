import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Menu.css';

class Navigator extends Component {
    render() {
        return(
            <div className="Navigator">
            <div className="Navigator_position">
                    <NavLink exact to="/"> 
                        <Button color="blue">그래프</Button>
                    </NavLink>
                    <NavLink exact to="/search/">    
                        <Button color ="violet">검색</Button>
                    </NavLink>
                    <NavLink exact to="/question">
                        <Button color="purple">질문</Button>
                    </NavLink>
                    {/* <NavLink exact to="/search/foo">
                        <Button color="purple">질문</Button>
                    </NavLink> */}
                    <NavLink exact to="/login">    
                        <Button color="pink">로그인</Button>
                    </NavLink>
                </div>
            </div>
        )
    }
};

export default Navigator;