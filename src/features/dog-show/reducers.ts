import * as Immutable from 'immutable'
import { combineReducers } from 'redux';;
import * as ActionTypes from './actions';
import { IActionCommon, IBreed, isBreedsArray, EmptyBreed, ActionPayload } from './model';

type ImmutableMap = Immutable.Map<string, string | IBreed | IBreed[] | string[] | Immutable.List<string> | boolean>;

const defaultSpecifyDogState = Immutable.Map({ breed: EmptyBreed, isFetching: true, images: Immutable.List<string>() });
function specifyDog (state: ImmutableMap = defaultSpecifyDogState, action: IActionCommon) :  ImmutableMap  {
    switch(action.type) {
    case ActionTypes.SHOW_SPECIFIC_DOG_REQUEST:
        return startFetching(state).set('breed', action.breed[0]);
    case ActionTypes.SHOW_SPECIFIC_DOG_SUCCESS:
        const images = Immutable.List<string>([action.response.message]);
        return stopFetching(state).set('images', images);
    case ActionTypes.ACTION_NOOP:
        return state.set('images', Immutable.List<string>(['']));
    case ActionTypes.SHOW_RANDOM_DOG_REQUEST:
        return startFetching(state);
    case ActionTypes.SHOW_RANDOM_DOG_SUCCESS:
        const images1 = Immutable.List<string>([action.response.message]);
        return stopFetching(state).set('images', images1);
    case ActionTypes.SHOW_SPECIFIC_DOG_FAILURE:
        return stopFetching(state);
    default:
        return state;
    }
}

export const defaultListOfDogsState = Immutable.Map({ breeds: [EmptyBreed], isFetching: false, selectedBreed: EmptyBreed });
export function listOfDogs(state: ImmutableMap = defaultListOfDogsState, action: ActionPayload) : ImmutableMap {
    switch(action.type) {
        case ActionTypes.LOAD_LIST_OF_DOGS_REQUEST:
            return startFetching(state);
        case ActionTypes.LOAD_LIST_OF_DOGS_SUCCESS:
            let breeds: IBreed[] = [EmptyBreed];
            for(const responsedBreed in action.response.message) {
                const breed = {
                    name: responsedBreed,
                    sub: action.response.message[responsedBreed]
                };
                breeds.push(breed);
            }
            return stopFetching(state).set('breeds', breeds);
        case ActionTypes.LOAD_LIST_OF_DOGS_FAILURE:
            return stopFetching(state);        
        case ActionTypes.SHOW_SPECIFIC_DOG_REQUEST:
            return startFetching(state).set('selectedBreed', action.breed);
        case ActionTypes.ACTION_NOOP:
            return state.set('selectedBreed',  EmptyBreed);
        case ActionTypes.SHOW_RANDOM_DOG_SUCCESS:
            const imageParts = action.response.message.split('/');
            const breedsPartIndex = imageParts.indexOf('breeds');
            const stateBreeds = state.get('breeds');
            const responsedImageBreed = imageParts[breedsPartIndex + 1].indexOf('-') >= 0 ?
                imageParts[breedsPartIndex + 1].split('-')[0] : 
                imageParts[breedsPartIndex + 1];
            let selected: IBreed = EmptyBreed;
            selected.selectedSub = '';
            if(isBreedsArray(stateBreeds)) {
                selected = stateBreeds.filter(x => x.name === responsedImageBreed)[0];
                if(imageParts[breedsPartIndex + 1].indexOf('-')) {
                    selected.selectedSub = imageParts[breedsPartIndex + 1].split('-')[1];
                }
            }
            return stopFetching(state).set('selectedBreed', selected);
        default:
            return state;
    }
}

export default combineReducers({
    listOfDogs,
    specifyDog
});

function stopFetching(state: ImmutableMap) : ImmutableMap {
    return state.set('isFetching', false);
}

function startFetching(state: ImmutableMap) : ImmutableMap {
    return state.set('isFetching', true);
}