
import * as Immutable from 'immutable'
import { combineReducers } from 'redux';;
import * as ActionTypes from './actions';
import { IActionCommon } from './model';

type ImmutableMap = Immutable.Map<string, string | string[] | Immutable.List<string> | boolean>;

const defaultState = Immutable.Map({ breed: '', isFetching: true, images: Immutable.List<string>() });

function specifyDog (state: ImmutableMap = defaultState, action: IActionCommon) :  ImmutableMap  {
    switch(action.type) {
    case ActionTypes.SHOW_SPECIFIC_DOG_REQUEST:
        return state.set('breed', action.breed).set('isFetching', true);
    case ActionTypes.SHOW_SPECIFIC_DOG_SUCCESS:
        const images = Immutable.List<string>([action.response.message]);
        return state.set('isFetching', false).set('images', images);
    case ActionTypes.SHOW_SPECIFIC_DOG_FAILURE:
        return state.set('isFetching', false);
    default:
        return state;
    }
}

function listOfDogs(state: ImmutableMap = Immutable.Map({ breeds : [], isFetching: false, selectedBreed: '' }), action: IActionCommon) : ImmutableMap {
    switch(action.type) {
        case ActionTypes.LOAD_LIST_OF_DOGS_REQUEST:
            return state.set('isFetching', true);
        case ActionTypes.LOAD_LIST_OF_DOGS_SUCCESS:
            let breeds = [''];
            for(const breed in action.response.message) {
                breeds.push(breed);
            }
            return state.set('isFetching', false)
                    .set('breeds', breeds)
        case ActionTypes.LOAD_LIST_OF_DOGS_FAILURE:
            return state.set('isFetching', false);        
        case ActionTypes.SHOW_SPECIFIC_DOG_REQUEST:
            return state.set('selectedBreed', action.breed);
        default:
            return state;
    }
}

export default combineReducers({
    listOfDogs,
    specifyDog
});
