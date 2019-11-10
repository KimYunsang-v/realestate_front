import axios from 'axios';


const baseUrl = "http://13.125.196.188:8080";
// const baseUrl = "http://localhost:8080";

export function getBoard(city,district,page) {
    return axios.get(`${baseUrl}/realestate/board/city/${city}/district/${district}/page/${page}`);
}

export function getDetailBoard(boardNo) {
    return axios.get(`${baseUrl}/realestate/board/detail/${boardNo}`);
}

export function postNewContent(data) {
    return axios.post(`${baseUrl}/realestate/board`,data)
}

export function postNewReply(data) {
    return axios.post(`${baseUrl}/realestate/board/answer`,data);
}

export function deleteContent(boardNo) {
    return axios.delete(`${baseUrl}/realestate/board/${boardNo}`);
}

export function postDeleteReply(answerNo) {
    return axios.delete(`${baseUrl}/realestate/board/answer/${answerNo}`);
}
