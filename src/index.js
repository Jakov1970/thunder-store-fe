import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./store/index.tsx";
///Wrap App with AuthContextProvider(context must be visable in every comoponent)!
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
