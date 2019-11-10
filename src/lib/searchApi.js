import axios from 'axios';


const baseUrl = "http://13.125.196.188:8080";
// const baseUrl = "http://localhost:8080";

// export function getbuliding(city) {
//     return axios.get(`${url}/realestate/search/${city}`);
// }


export function getbuliding(data) {
    return axios.post(`${baseUrl}/realestate/search`, data)
    .then( response => { 
        console.log(response.data);
        return response.data;
    })
    .catch(error =>  {console.log(error)})
    ;
}