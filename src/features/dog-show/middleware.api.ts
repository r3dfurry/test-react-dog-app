import { ActionPayload, isActionAPI } from './model';

export const CALL_API = 'Call API';
const callApi = (endpoint: any) => {
    return fetch(endpoint)
        .then(response => response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        }))
}

export default (store: any) => (next: any) => (action: ActionPayload) => {
    if(!isActionAPI(action)) {
        return next(action);
    }
    const callAPI = action[CALL_API];
    const actionWith = (payload: any) => {
        const finalAction = Object.assign({}, action, payload);
        delete finalAction[CALL_API];
        return finalAction;
    }
    const [ requestType, successType, failureType ] = callAPI.types;
    const { endpoint } = callAPI;
    next(actionWith({ type: requestType }));
    return callApi(endpoint).then(
            response => next(actionWith({
                response,
                type: successType
            })),
            error => next(actionWith({
                error: error.message || 'Error occured.',
                type: failureType
            })));
}