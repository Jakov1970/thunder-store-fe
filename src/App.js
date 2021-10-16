import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { HomePage, UserPage, Register, Login } from "./pages";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Toast } from "./components";
import useBeforeReload from "./hooks/use-Before-Reload";
import { refreshTokenAction } from "./store/actions";
import { useAppDispatch, useAppSelector } from "./hooks";
import { routes } from "./constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyles } from "./styles";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import { Progress } from "./components/Progress";

import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

function App() {
  const dispatch = useAppDispatch();
  const { isLogin, startTime, currentTime, accessToken } = useSelector(
    (state) => state.auth
  );

  const { showProgressBar } = useAppSelector((state) => state.file);

  useBeforeReload();
  useEffect(() => {
    let timer;
    if (isLogin && startTime - currentTime > 0) {
      timer = setTimeout(() => {
        dispatch(refreshTokenAction(accessToken));
      }, startTime - currentTime);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isLogin]);

  return (
    <Router>
      <div>
        {showProgressBar && <Progress />}
        <Switch>
          <Route exact path={routes.ROOT} component={Login} />

          <Route path={routes.REGISTER} component={Register} />

          <Route path={routes.LOG_IN} component={Login} />

          <ProtectedRoute path={routes.HOME} component={HomePage} />

          <ProtectedRoute path={routes.USER_INFO} component={UserPage} />

          <Route path={routes.LOGGED_OUT} />

          <Route exact path={routes.UNAUTHRIZED} component={Unauthorized} />

          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </div>
      <Toast></Toast>
      <GlobalStyles />
    </Router>
  );
}

export default App;
