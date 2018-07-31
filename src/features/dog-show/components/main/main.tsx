
import * as React from 'react';
import { Provider } from 'react-redux';
import DogViewer from '../../containers/DogViewer';
import './main.css';
import { loadSpecificDog, loadListOfDogs } from '../../actions';
import { IBreed } from '../../model';

interface IState {
  breeds: IBreed[]
}

class App extends React.Component<any, IState> {
  
  constructor (props: any) {
    super(props);
    this.props.store.dispatch(loadListOfDogs());
  }
  
  public handleShowSpecificBreedClick(breed: IBreed[]) {
    this.props.store.dispatch(loadSpecificDog(breed));
  }

  public render () {
    debugger
    return (
      <Provider store={this.props.store}>
        <DogViewer />
      </Provider>
    );
  }
}

export default App;
