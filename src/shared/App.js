import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {Chart} from '../components/chart'
import {Home} from '../components/home'
import {Search} from '../components/search'
import {Menu} from 'components/pages';
import Community from '../components/question/Community'
import Login from 'components/login/Login'

class App extends Component {
    state = {
        token : ''
    }

    setToken = (token) => {
        this.setState({
            token : token
        })
    }

    render() {
        return (
            <div>
                <Menu/>
                    <Route exact path="/" component={Home} setToken={this.setToken}/>
                <Switch>
                    {/* <Route path="/search/:name" component={Search}/> */}
                    <Route path="/chart" component={Chart}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/community" component={Community} token={this.state.token}/>
                    <Route path="/login" component={Login} setToken={this.setToken}/>
                </Switch>
            </div>
        );
    }
}

export default App;