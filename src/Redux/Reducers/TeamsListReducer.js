import { ACTION } from "../../Constants";

export default function(state = null, action) {
  switch (action.type) {
    case ACTION.GET_TEAM:
      return action.payload;
    default:
      return state;
  }
}
