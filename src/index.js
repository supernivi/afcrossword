import "./index.css";

import { CssBaseline, ZeitProvider } from "@zeit-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./components/App";
import Finish from "./components/Finish";
import * as serviceWorker from "./serviceWorker";

// var userId, user;

// userId = localStorage.getItem("user");

const Index = () => {
  React.useEffect(() => {
    ReactGA.initialize("UA-131255348-11");
  }, []);

  return (
    <React.StrictMode>
      <ZeitProvider>
        <CssBaseline>
          <BrowserRouter>
            <Switch className="container">
              <Route exact path="/" component={App} />
              <Route path="/finish" component={Finish} />
              <Route component={() => <>Invalid path</>} />
            </Switch>
          </BrowserRouter>
        </CssBaseline>
      </ZeitProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
