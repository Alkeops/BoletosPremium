import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import 'semantic-ui-css/semantic.min.css'

const rootEl = document.getElementById("root");
const render = () => {
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootEl
);}

if(module.hot) {
  module.hot.accept('./components/App', () => setTimeout(render))
}

render();
