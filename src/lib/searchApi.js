import axios from 'axios';

const url = "http://localhost:8080";

// export function getbuliding(city) {
//     return axios.get(`${url}/realestate/search/${city}`);
// }


export function getbuliding(data) {
    return axios.post(`${url}/realestate/search`, data)
    .then( response => { 
        console.log(response.data);
        return response.data;
    })
    .catch(error =>  {console.log(error)})
    ;
}