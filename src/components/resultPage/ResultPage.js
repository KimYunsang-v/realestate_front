import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './ResultPage.css';
import ResultList from './ResultList';
import Pagination from './Pagination';

class ResultPage extends Component {
    static defaultProps = {
        list: []
    }
    render() {
        const { pageOfItems } = this.props.resultData;
        const { items,onChangePage } = this.props;
        const list = pageOfItems.map(
            info => (
                <ResultList key={info.no}
                    info={info} />
            )
        );
        return (
            <div>
                {/* 매물보여주는 div */}
                <div className="dealTypeDiv">
                    {list} 
                </div>
                <div className="paginationDiv">
                    <Pagination items={items} onChangePage={onChangePage} />
                </div>
            </div>
        );
    }
}

export default ResultPage;