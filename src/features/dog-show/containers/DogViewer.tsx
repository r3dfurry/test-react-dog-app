import * as React from 'react';
import { loadListOfDogs, loadSpecificDog, showRandomDog} from '../actions';
import { connect } from 'react-redux';
import { ModeSwitcher } from '../components/mode-switcher';
import ImageShow from '../components/image-show';
import { IBreed } from '../model';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps<any, any> {
    breeds: IBreed[];
    imageLink: string;
    selectedBreed: IBreed;
    loadListOfDogs: (breed?: IBreed) => {};
    loadSpecificDog: (breed: IBreed[]) => {};
    showRandomDog: () => {};
    trySpecifyBreed: (breed: string) => {};
}
 
class DogViewer extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }
    public componentDidMount() {
        this.props.loadListOfDogs(this.props.match.params.breed);
        this.props.loadSpecificDog([{ name: this.props.match.params.breed, sub: []}]);
    }
    public render() {
        return (
            <div>
                <ModeSwitcher
                    breeds={this.props.breeds}
                    selectedBreed={this.props.selectedBreed}
                    showRandomBreedClick={this.props.showRandomDog}
                    showSpecificBreedClick={this.props.loadSpecificDog}/>
                <ImageShow
                    breed={this.props.selectedBreed}
                    imageLink={this.props.imageLink} />
            </div>
        )
    }
}
const mapStateToProps = (state: any, ownProps: any) => {
    return {
        breeds: state.listOfDogs.get('breeds'),
        imageLink: state.specifyDog.get('images').get(0),
        isFetching: state.listOfDogs.get('isFetching'),
        selectedBreed: state.listOfDogs.get('selectedBreed')
    };
}

export default connect(mapStateToProps, {
    loadListOfDogs,
    loadSpecificDog,
    showRandomDog
})(DogViewer);