import { ACTION } from "../../Constants";

export default function(state = null, action) {
	console.log(action);
  switch (action.type) {
    case ACTION.GET_MATCH:
      return action.payload;
    default:
      return state;
  }
}
