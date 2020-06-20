import "./index.css";

import { CssBaseline, ZeitProvider } from "@zeit-ui/react";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./components/App";
import Finish from "./components/Finish";
import { generateUser } from "./const/common";
import * as serviceWorker from "./serviceWorker";

const trackingId = "UA-131255348-11";

ReactGA.initialize(trackingId);

var userId, user;

userId = localStorage.getItem("user");
if (userId === null) {
  console.log("New user");
  user = generateUser();
  localStorage.setItem("user", user);
  ReactGA.set({
    userId: user,
  });
} else {
  console.log("Old user");
}

const history = createBrowserHistory();

history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

ReactDOM.render(
  <React.StrictMode>
    <ZeitProvider>
      <CssBaseline>
        <BrowserRouter history={history}>
          <Switch className="container">
            <Route exact path="/" component={App} />
            <Route path="/finish" component={Finish} />
            <Route component={() => <>Invalid path</>} />
          </Switch>
        </BrowserRouter>
      </CssBaseline>
    </ZeitProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
