import * as Actions from './actions';
import { CALL_API } from './middleware.api';
import { EmptyBreed, isActionAPI, isActionCommon } from './model';

describe('Action creators', () => {
    it('API action creator return valid object', () => {
        const endpoint = 'http://testendpoint.com/api/somemethod';
        const [requestAction, successAction, failureAction] = ['action1', 'action2', 'action3'];
        const apiAction = Actions.apiActionCreator(endpoint, requestAction, successAction, failureAction);

        expect(apiAction[CALL_API]).toBeTruthy();
        const [comparedRequestAction, comparedSuccessAction, comparedFailureAction] = apiAction[CALL_API].types;
        expect((requestAction === comparedRequestAction) && (successAction === comparedSuccessAction) && (failureAction === comparedFailureAction)).toBeTruthy();
    });

     it('fetchSpecificDog generate noop action, when input breed empty', () => {
         const fetchSpecificDogAction = Actions.fetchSpecificDog([EmptyBreed]);
         expect(isActionAPI(fetchSpecificDogAction)).toBeFalsy();
         expect(isActionCommon(fetchSpecificDogAction)).toBeTruthy();
         if(isActionCommon(fetchSpecificDogAction)) {
            expect(fetchSpecificDogAction.type).toBe(Actions.ACTION_NOOP);
         }
     });
});