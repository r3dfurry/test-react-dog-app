import * as React from 'react';
import { loadListOfDogs, loadSpecificDog } from '../actions';
import { connect } from 'react-redux';
import { ModeSwitcher } from '../components/mode-switcher';
import ImageShow from '../components/image-show';
import * as Immutable from 'immutable';

interface IProps {
    breeds: Immutable.List<string>;
    imageLink: string;
    selectedBreed: string;
    loadListOfDogs: () => {};
    loadSpecificDog: (breed: string) => {};
}
 
class DogViewer extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }
    public componentWillMount() {
        this.props.loadListOfDogs();
    }
    public render() {
        return (
            <div>
                <ModeSwitcher
                    breeds={this.props.breeds}
                    selectedBreed={this.props.selectedBreed}
                    showRandomBreedClick={this.props.loadListOfDogs}
                    showSpecificBreedClick={this.props.loadSpecificDog}/>
                <ImageShow
                    breed={this.props.selectedBreed}
                    imageLink={this.props.imageLink} />
            </div>
        )
    }
}
const mapStateToProps = (state: any, ownProps: any) => {
    // tslint:disable-next-line:no-console
    console.log(state.specifyDog.get('images'));
    return {
        breeds: state.listOfDogs.get('breeds'),
        imageLink: state.specifyDog.get('images').get(0),
        isFetching: state.listOfDogs.get('isFetching'),
        selectedBreed: state.listOfDogs.get('selectedBreed')
    };
}

export default connect(mapStateToProps, {
    loadListOfDogs,
    loadSpecificDog
})(DogViewer);