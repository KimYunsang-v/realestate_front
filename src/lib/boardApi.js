import axios from 'axios';


const baseUrl = "http://13.125.253.140:8080";

export function getBoard(city,district,page) {
    return axios.get(`${baseUrl}/realestate/board/city/${city}/district/${district}/page/${page}`);
}

export function getDetailBoard(boardNo) {
    return axios.get(`${baseUrl}/realestate/board/detail/${boardNo}`);
}

export function postNewContent(data) {
    return axios.post(`${baseUrl}/realestate/board`,data[0]
        ).then((res) => {
            console.log("RESPONSE RECEIVED: ", res)
        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
        });
}

export function postNewReply(data) {
    return axios.post(`${baseUrl}/realestate/board/answer`,data[0]);
}

export function deleteContent(boardNo) {
    return axios.delete(`${baseUrl}/realestate/board/${boardNo}`);
}

export function postDeleteReply(answerNo) {
    return axios.delete(`${baseUrl}/realestate/board/answer/${answerNo}`);
}
