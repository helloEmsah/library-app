import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import Spinner from "../../Components/Spinner";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(LoginContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading ? (
          <Spinner />
        ) : state.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
