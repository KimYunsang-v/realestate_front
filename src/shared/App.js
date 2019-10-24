import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {Chart} from '../components/chart'
import {Home} from '../components/home'
import {Search} from '../components/search'
import {Question, Login, Menu} from 'components/pages';

class App extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Route exact path="/" component={Home}/>
                <Switch>
                    {/* <Route path="/search/:name" component={Search}/> */}
                    <Route path="/chart" component={Chart}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/question" component={Question}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </div>
        );
    }
}

export default App;