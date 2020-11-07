import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
import "./styles/style.scss";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./config/store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

const rootEl = document.getElementById("root");
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./components/App", () => setTimeout(render));
}

render();
