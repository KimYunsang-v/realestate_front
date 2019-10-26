import axios from 'axios';
import baseUrl from 'util';

export function postSingUpClient(userdata) {
    return axios.post(`${baseUrl}/realestate/sign/client/`,userdata[0]);
}

export function postSingUpAdmin(admindata) {
    return axios.post(`${baseUrl}/realestate/sign/admin/`,admindata);
}

export function getSignUp(userdata) {
    return axios.post(`${baseUrl}/realestate/sign/`,userdata[0]);
}

export function putCient(userdata,key){
    console.log("putClient ",userdata)
    return  axios.put(`${baseUrl}/realestate/sign/`,userdata[0],
    {headers: {"X-Auth-Token": key}
})
}