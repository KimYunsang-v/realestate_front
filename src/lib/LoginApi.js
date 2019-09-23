import axios from 'axios';

const url = "http://54.180.120.77:8080";

export function postSingUpClient(userdata) {
    return axios.post(`${url}/realestate/sign/client/`,userdata[0]);
}
export function postSingUpAdmin(admindata) {
    return axios.post(`${url}/realestate/sign/admin/`,admindata);
}
export function getSignUp(userdata) {
    return axios.post(`${url}/realestate/sign/`,userdata[0]);
}
export function putCient(userdata,key){
    console.log("putClient ",userdata)
    return  axios.put(`${url}/realestate/sign/`,userdata[0],
    {headers: {"X-Auth-Token": key}
})
}