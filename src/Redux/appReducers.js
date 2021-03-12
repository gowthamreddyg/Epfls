import { combineReducers } from "redux";
import MatchListReducer from "./Reducers/MatchListReducer";
import TeamsListReducer from "./Reducers/TeamsListReducer";

const appReducerList = combineReducers({
	matches:MatchListReducer,
	teams:TeamsListReducer
});	

export default appReducerList;
