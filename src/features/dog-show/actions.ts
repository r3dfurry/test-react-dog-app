import { ActionPayload, IActionAPI } from './model';
import { CALL_API } from './middleware.api';

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

export const SHOW_RANDOM_DOG = 'SHOW_RANDOM_DOG';
export function showRandomDog() : ActionPayload {
    return {
        apiCall: true,
        type: SHOW_RANDOM_DOG
    }
};

export const SHOW_SPECIFIC_DOG_REQUEST = 'SHOW_SPECIFIC_DOG_REQUEST';
export const SHOW_SPECIFIC_DOG_SUCCESS = 'SHOW_SPECIFIC_DOG_SUCCESS';
export const SHOW_SPECIFIC_DOG_FAILURE = 'SHOW_SPECIFIC_DOG_FAILURE';
const fetchSpecificDog = (breed: string) => ({
    [CALL_API]: {
        endpoint: `https://dog.ceo/api/breed/${breed}/images/random`,
        
        types: [SHOW_SPECIFIC_DOG_REQUEST, SHOW_SPECIFIC_DOG_SUCCESS, SHOW_SPECIFIC_DOG_FAILURE]
        
    },
    breed
});
export const loadSpecificDog = (breed: string) => (dispatch: any) => {
    dispatch(fetchSpecificDog(breed));
}
