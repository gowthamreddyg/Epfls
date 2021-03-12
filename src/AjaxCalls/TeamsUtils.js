import axios from "axios";

export const teamList = ()=> {
    return  axios
    .get("./teams.json")
    .then(res => {
    	console.log(res.data);
    	return Promise.resolve(res.data);
    })
    .catch(err =>{
    	return Promise.resolve(err.response && err.response.data ? err.response.data : "");
    })
}