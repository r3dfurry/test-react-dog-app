
import * as Immutable from 'immutable';
import * as React from 'react';
import { Provider } from 'react-redux';
import DogViewer from '../../containers/DogViewer';
import './main.css';
import { loadSpecificDog, loadListOfDogs } from '../../actions';

interface IState {
  breeds: Immutable.List<string>
}

class App extends React.Component<any, IState> {
  
  constructor (props: any) {
    super(props);
    this.props.store.dispatch(loadListOfDogs());
    this.state = { breeds: Immutable.List.of('a', 'b', 'c') };
  }
  
  public handleShowSpecificBreedClick(breed: string) {
    this.props.store.dispatch(loadSpecificDog(breed));
  }

  public render () {
    return (
      <Provider store={this.props.store}>
        <DogViewer />
      </Provider>
    );
  }
}

export default App;
