import {matchList} from '../../AjaxCalls/MatchUtils';
import { ACTION } from "../../Constants";

export const matches = () => dispatch => {
	matchList().then((results) => {
	dispatch({
        type: ACTION.GET_MATCH, 
        payload: results
    });
	}).catch((err) => {
        dispatch({
	        type: ACTION.GET_ERRORS, 
	        payload: err
    });
    });
}