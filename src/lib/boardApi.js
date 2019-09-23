import axios from 'axios';

const url = "http://54.180.120.77:8080";

export function getBoard() {
    return axios.get(`${url}/realestate/board`);
}

export function getDetailBoard(boardNo) {
    return axios.get(`${url}/realestate/board/detail/${boardNo}`);
}

export function postNewContent(data) {
    return axios.post(`${url}/realestate/board`,data[0]
        ).then((res) => {
            console.log("RESPONSE RECEIVED: ", res)
        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
        });
}

export function postNewReply(data) {
    return axios.post(`${url}/realestate/board/answer`,data[0]);
}

export function deleteContent(boardNo) {
    return axios.delete(`${url}/realestate/board/${boardNo}`);
}

export function postDeleteReply(answerNo) {
    return axios.delete(`${url}/realestate/board/answer/${answerNo}`);
}
