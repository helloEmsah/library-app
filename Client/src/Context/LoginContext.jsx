import React, { createContext, useReducer } from "react";

export const LoginContext = createContext();

const initialState = {
  isLogin: false || localStorage.getItem("isLogin"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
      return {
        ...state,
        isLogin: true,
        user: null,
        loading: false,
      };
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return { ...state, isLogin: true, loading: false };
    case "LOGOUT":
      localStorage.removeItem("isLogin");
      return { ...state, isLogin: false, user: null };
    default:
      throw new Error();
  }
};

const LoginContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoginContext.Provider value={[state, dispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
