import * as React from 'react';
import { loadListOfDogs, loadSpecificDog, showRandomDog} from '../actions';
import { connect } from 'react-redux';
import { ModeSwitcher } from '../components/mode-switcher';
import ImageShow from '../components/image-show';
import { IBreed } from '../model';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps extends RouteComponentProps<any, any> {
    breeds: IBreed[];
    imageLink: string;
    selectedBreed: IBreed;
    loadListOfDogs: (breed?: string) => {};
    loadSpecificDog: (breed: IBreed[]) => {};
    showRandomDog: () => {};
}
 
class DogViewer extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }
    public componentDidMount() {
        const { props } = this;
        const { breed } = props.match.params;
        props.loadListOfDogs(breed);
    }


    public render() {
        const { breeds, selectedBreed, imageLink } = this.props;
        return (
            <div>
                <ModeSwitcher
                    breeds={breeds}
                    selectedBreed={selectedBreed}
                    showRandomBreedClick={this.props.showRandomDog}
                    showSpecificBreedClick={(breed: IBreed[]) => {
                        const [specificBreed] = breed;
                        history.pushState(null, undefined, `/dogs/${specificBreed.name}`);
                        this.props.loadSpecificDog(breed);
                    }}/>
                <ImageShow
                    breed={selectedBreed}
                    imageLink={imageLink} />
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

export default withRouter(connect(mapStateToProps, {
    loadListOfDogs,
    loadSpecificDog,
    showRandomDog
})(DogViewer));