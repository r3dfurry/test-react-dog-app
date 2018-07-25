import * as React from 'react';
import { loadListOfDogs, loadSpecificDog } from '../actions';
import { connect } from 'react-redux';
import { ModeSwitcher } from '../components/mode-switcher';
 
class DisplayModeSwitcher extends React.Component<any, any> {
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
            </div>
        )
    }
}
const mapStateToProps = (state: any, ownProps: any) => {
    return {
        breeds: state.listOfDogs.get('breeds'),
        isFetching: state.listOfDogs.get('isFetching'),
        selectedBreed: state.listOfDogs.get('selectedBreed')
    };
}

export default connect(mapStateToProps, {
    loadListOfDogs,
    loadSpecificDog
})(DisplayModeSwitcher);