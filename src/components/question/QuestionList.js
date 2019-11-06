import React,{ Component } from 'react';
import { Table, Button, Modal, Input, Form, Segment, Menu, List } from 'semantic-ui-react';
import { Pagination } from './';
import * as regionData from '../chart/SelectData';

class QuestionList extends Component {
    state = { 
        detailPageOpen: false,
        open: false,
        title: '',
        contents: '', 
        author: '',
        boardNo: ''
    }

    //팝업 창 닫기 설정
    closeConfigShow = ( closeOnDimmerClick ) => () => {
        this.setState({ closeOnDimmerClick, open: true })
    }
    close = () => this.setState({ open: false }) 
    
    //데이터 처리
    inputChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    inputChangeContents = (e) => {
        this.setState({
            contents: e.target.value
        });
    }
    
    //submit 버튼 클릭 시 Question으로 전달
    submitClick = () => {
        const {title, contents} = this.state
        const data = [];
        data.push({
                author: 'asdf',
                content: contents,
                title: title
            });
        console.log(data)
        if(title !== '' && contents !== ''){
            this.props.handleSubmit(data);
            this.setState({open:false})
        }
    }

    render() {
        const {open,closeOnDimmerClick} = this.state
        //부모 컴포넌트에서 게시판 데이터 받아옴
        const {pageOfItems} = this.props.items
        const {items,onChangePage,detailBoardData} = this.props

        const city = regionData.city;

        console.log(city);

        return(
            <div>
                {/* 게시글 */}
                    <Table selectable>
                        <Table.Header>
                            <Table.Row textAlign='center'>
                                <Table.HeaderCell width="2">작성자</Table.HeaderCell>
                                <Table.HeaderCell width="4">제목</Table.HeaderCell>                                
                                <Table.HeaderCell width="5">작성일</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {
                            items.map( (post) => {
                            return (
                                <Table.Row textAlign='center' key={post.no} selectable onClick={() => this.props.listClickEvent(post)}>
                                    <Table.Cell>{post.author}</Table.Cell>
                                    <Table.Cell>
                                            {post.title}
                                    </Table.Cell>
                                    <Table.Cell>{post.registerDate}</Table.Cell>
                                </Table.Row>
                            );
                        })}

                        </Table.Body>
                    </Table>   
            </div>
        )
    }
}

export default QuestionList;