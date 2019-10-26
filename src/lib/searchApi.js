import axios from 'axios';
import baseUrl from 'util';

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