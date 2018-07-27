import { IActionAPI, IBreed, ActionPayload } from './model';
import { CALL_API } from './middleware.api';

export const ACTION_NOOP = 'ACTION_NOOP';

export const LOAD_LIST_OF_DOGS_REQUEST = 'LOAD_LIST_OF_DOGS_REQUEST';
export const LOAD_LIST_OF_DOGS_SUCCESS = 'LOAD_LIST_OF_DOGS_SUCCESS';
export const LOAD_LIST_OF_DOGS_FAILURE = 'LOAD_LIST_OF_DOGS_FAILURE';
const fetchListOfDogs = (): IActionAPI => ({
    [CALL_API]: {        
        endpoint: 'https://dog.ceo/api/breeds/list/all',
        types: [LOAD_LIST_OF_DOGS_REQUEST, LOAD_LIST_OF_DOGS_SUCCESS, LOAD_LIST_OF_DOGS_FAILURE]
    }
});
export const loadListOfDogs = () => (dispatch: any) => {
    dispatch(fetchListOfDogs());
};

export const SHOW_RANDOM_DOG_REQUEST = 'SHOW_RANDOM_DOG_REQUEST';
export const SHOW_RANDOM_DOG_SUCCESS = 'SHOW_RANDOM_DOG_SUCCESS';
export const SHOW_RANDOM_DOG_FAILURE = 'SHOW_RANDOM_DOG_FAILURE';
const fetchRandomBreed = (): IActionAPI => apiActionCreator('https://dog.ceo/api/breeds/image/random', SHOW_RANDOM_DOG_REQUEST, SHOW_RANDOM_DOG_SUCCESS, SHOW_RANDOM_DOG_FAILURE);
export const showRandomDog =() => (dispatch: any) => {
    dispatch(fetchRandomBreed());
};

export const SHOW_SPECIFIC_DOG_REQUEST = 'SHOW_SPECIFIC_DOG_REQUEST';
export const SHOW_SPECIFIC_DOG_SUCCESS = 'SHOW_SPECIFIC_DOG_SUCCESS';
export const SHOW_SPECIFIC_DOG_FAILURE = 'SHOW_SPECIFIC_DOG_FAILURE';
export const fetchSpecificDog = (breeds: IBreed[]) : ActionPayload => {
        const [fetchedBreed] = breeds;
        if(breeds.length === 0 || fetchedBreed.name === '') {
            return {
                type: ACTION_NOOP
            }
        }
        return Object.assign(apiActionCreator(`https://dog.ceo/api/breed/${fetchedBreed.name}/images/random`, SHOW_SPECIFIC_DOG_REQUEST, SHOW_SPECIFIC_DOG_SUCCESS, SHOW_SPECIFIC_DOG_FAILURE), {
            breed: fetchedBreed
        });
};

export function apiActionCreator(endpoint: string, requestAction: string, successAction: string, failureAction: string) {
    return {
        [CALL_API]: {
            endpoint,
            types: [requestAction, successAction, failureAction]
        }
    }
}

export const loadSpecificDog = (breed: IBreed[]) => (dispatch: any) => {
    dispatch(fetchSpecificDog(breed));
}
