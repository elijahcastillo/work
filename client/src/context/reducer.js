import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  VERIFIED_TOKEN,
  LOG_OUT,
} from "./actions";

const reducer = (state, action) => {
  if (action.type == REGISTER_USER_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      user: {
        name: action.payload.user.name,
        email: action.payload.user.email,
      },
    };
  }

  if (action.type == LOGIN_USER_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      user: {
        name: action.payload.user.name,
        email: action.payload.user.email,
      },
    };
  }

  if (action.type == VERIFIED_TOKEN) {
    return {
      ...state,
      isAuthenticated: action.payload.auth,
    };
  }

  if (action.type == LOG_OUT) {
    return {
      ...state,
      isAuthenticated: false,
      token: "",
      user: {
        name: "",
        email: "",
      },
    };
  }
  throw new Error(`not such action : ${action.type}`);
};

export default reducer;
