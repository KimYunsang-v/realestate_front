import React, { Component } from 'react';
import { Table, Comment, Button } from 'semantic-ui-react';


class detailPage extends Component {
    _isMounted = false
    state = {
        title: '',
        content: '',
        
    }

    componentDidMount() {
       // this.setData()
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
        this.setData()
    }
    
    setData = () => {
        const detailBoardItems = this.props
        console.log(detailBoardItems)
        if(this._isMounted){
            this.setState({
                title: detailBoardItems.title,
                content: detailBoardItems.content
            })
        }
    }

    render() {
        return (
            
            <Table>
                <Table.Header>
                    {this.title}
                </Table.Header>
                <Table.Body>
                    {this.content}
                    <Comment></Comment>
                </Table.Body>
                <Table.Footer>
                    <Button>뒤로가기</Button>
                </Table.Footer>
            </Table>
        );
    }
}

export default detailPage;