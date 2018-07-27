import * as React from 'react';
import DogViewer from './DogViewer';
import { Provider } from 'react-redux'; 
import { create } from 'react-test-renderer';
import configureStore from '../store';

test('1', () => {
    const store = configureStore();

    const component = create(
      <Provider store={store}>
        <DogViewer />
      </Provider>
    ).toJSON();
    
    expect(component).toMatchSnapshot();

});
