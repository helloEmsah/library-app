import React, { createContext, useReducer } from "react";

export const LoginContext = createContext();

const initialState = {
  isLogin: false || localStorage.getItem("isLogin"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("isLogin", true);
      return { ...state, isLogin: true };
    case "LOGOUT":
      localStorage.removeItem("isLogin");
      return { ...state, isLogin: false };
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
