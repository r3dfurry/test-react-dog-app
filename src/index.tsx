import * as React from 'react';
import { render } from 'react-dom';
import Dogs from './features/dog-show/containers/DogViewer';
import NotFound from './common/not-found';
import configureStore from './features/dog-show/store';
import './index.css';
import 'semantic-ui/dist/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { Provider } from 'react-redux';

const store = configureStore();

render(
  <Router>
    
      <Provider store={store}>
        <Switch>
          <Route path="/dogs/:breed" component={Dogs} />
          <Route path="/dogs" component={Dogs} />
          <Route Path="*">
            <NotFound />      
          </Route>
        </Switch>
      </Provider>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
