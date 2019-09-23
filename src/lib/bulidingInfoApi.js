import axios from 'axios';

const url = "http://54.180.120.77:8080";

export function getbuliding(city) {
    return axios.get(`${url}/realestate/search/${city}`);
}
