import './index.scss';

import { CssBaseline, ZeitProvider } from '@zeit-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import Finish from './components/Finish';
import { gaInitialize, pageView } from './const/common';

const Index = () => {
  React.useEffect(() => {
    gaInitialize();
    pageView('/');
  }, []);

  return (
    <React.StrictMode>
      <ZeitProvider>
        <CssBaseline>
          <BrowserRouter>
            <Switch>
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

ReactDOM.render(<Index />, document.getElementById('root'));
