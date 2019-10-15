import axios from 'axios';

const url = "http://localhost:8080";

export function getbuliding(city) {
    return axios.get(`${url}/realestate/search/${city}`);
}
