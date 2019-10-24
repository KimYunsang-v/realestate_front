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
  } from 'semantic-ui-react'

class Home extends Component{

    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })


    render(){
        const { fixed } = this.state

        return(
            <Container text>
                <Header
                    as='h1'
                    content='Imagine-a-Company'
                    style={{
                    fontWeight: 'normal',
                    marginBottom: 0,
                    }}
                />
                <Header
                    as='h2'
                    content='Do whatever you want when you want to.'
                    style={{
                    fontWeight: 'normal',
                    }}
                />
                <Button primary size='huge'>
                    Get Started
                    <Icon name='right arrow' />
                </Button>
            </Container>
        );
    }
}

export default Home;