import * as React from 'react';
import { render } from 'react-dom';
import App from './features/dog-show/components/main/main';
import configureStore from './features/dog-show/store';
import './index.css';
import 'semantic-ui/dist/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
  <App store={store} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
