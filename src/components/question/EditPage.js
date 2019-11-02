import React, { Component } from 'react';
import { Table, Comment, Button, Segment, Form, TextArea } from 'semantic-ui-react';


class editPage extends Component {
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
            
            <Segment>
                
                <Form>
                    
                    <Form.Input label='제목' placeholder='제목을 입력해주세요' />                        

                    <TextArea placeholder='내용을 입력해주세요' />
                    
                </Form>

            </Segment>




            // <Table>
            //     <Table.Header>
            //         {this.title}
            //     </Table.Header>
            //     <Table.Body>
            //         {this.content}
            //         <Comment></Comment>
            //     </Table.Body>
            //     <Table.Footer>
            //         <Button>뒤로가기</Button>
            //     </Table.Footer>
            // </Table>
        );
    }
}

export default editPage;