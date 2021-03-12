import {teamList} from '../../AjaxCalls/TeamsUtils';
import { ACTION } from "../../Constants";

export const teams = () => dispatch => {
	teamList().then((results) => {
        console.log(results);
	dispatch({
        type: ACTION.GET_TEAM, 
        payload: results
    });
	}).catch((err) => {
        dispatch({
	        type: ACTION.GET_ERRORS, 
	        payload: err
    });
    });
}