import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { routes } from "../constants/routes";
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { isLogin } = useAppSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: routes.UNAUTHORIZED,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
