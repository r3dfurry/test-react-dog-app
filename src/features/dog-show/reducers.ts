
import * as Immutable from 'immutable'
import { combineReducers } from 'redux';;
import * as ActionTypes from './actions';
import { IActionCommon, IBreed } from './model';

type ImmutableMap = Immutable.Map<string, string | IBreed | IBreed[] | string[] | Immutable.List<string> | boolean>;

const defaultSpecifyDogState = Immutable.Map({ breed: { name: '', sub: [] }, isFetching: true, images: Immutable.List<string>() });
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

const defaultListOfDogsState = Immutable.Map({ breeds: [], isFetching: false, selectedBreed: '' });
function listOfDogs(state: ImmutableMap = defaultListOfDogsState, action: IActionCommon) : ImmutableMap {
    switch(action.type) {
        case ActionTypes.LOAD_LIST_OF_DOGS_REQUEST:
            return startFetching(state);
        case ActionTypes.LOAD_LIST_OF_DOGS_SUCCESS:
            let breeds: IBreed[] = [{name: '', sub: []}];
            for(const responsedBreed in action.response.message) {
                const breed = {
                    name: responsedBreed,
                    sub: action.response.message[responsedBreed]
                };
                breeds.push(breed);
            }
            return stopFetching(state).set('breeds', breeds)
        case ActionTypes.LOAD_LIST_OF_DOGS_FAILURE:
            return stopFetching(state);        
        case ActionTypes.SHOW_SPECIFIC_DOG_REQUEST:
            return startFetching(state).set('selectedBreed', action.breed);
        case ActionTypes.ACTION_NOOP:
            return state.set('selectedBreed',  { name: '', sub: []});
        case ActionTypes.SHOW_RANDOM_DOG_SUCCESS:
            const imageParts = action.response.message.split('/');
            const breedsPartIndex = imageParts.indexOf('breeds');
            return stopFetching(state).set('selectedBreed', imageParts[breedsPartIndex + 1]);
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