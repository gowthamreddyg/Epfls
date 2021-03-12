import axios from "axios";

export const matchList = ()=> {
    return axios
    .get("./matchList.json")
    .then(res => {
    	return Promise.resolve(res.data);
    })
    .catch(err =>{
    	return Promise.resolve(err.response && err.response.data ? err.response.data : "");
    })
}
