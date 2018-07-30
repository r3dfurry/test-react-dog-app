import * as React from 'react';
import { render } from 'react-dom';
import App from './features/dog-show/components/main/main';
import NotFound from './common/not-found';
import configureStore from './features/dog-show/store';
import './index.css';
import 'semantic-ui/dist/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

const store = configureStore();

render(
  <Router>
      <Switch>
        <Route path="/dogs">
          <App store={store} />
        </Route>
        <Route Path="*">
          <NotFound />      
        </Route>
      </Switch>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
