import * as Reducers from './reducers';
import * as Actions from './actions';
import { IBreed, IActionCommon, isBreed } from './model';

describe(`Reducers - ${Actions.SHOW_RANDOM_DOG_SUCCESS} action`, () => {

    const TestingBreedNameWithoutSub = 'testBreed';
    const TestingSubBreed = 'subBreed';
    const TestingBreedNameWithSub = `${TestingBreedNameWithoutSub}-${TestingSubBreed}`;

    let fetchSpecificDogAction: IActionCommon = {
        response: {
            message: `//breeds/${TestingBreedNameWithoutSub}/`
        },
        type: Actions.SHOW_RANDOM_DOG_SUCCESS
    };

    let fetchSpecificDogActionWithSub: IActionCommon = {
        response: {
            message: `//breeds/${TestingBreedNameWithSub}/`
        },
        type: Actions.SHOW_RANDOM_DOG_SUCCESS
    };

    it('Generate breed (without sub) name correctly', () => {
        const nameChecker = (breed: IBreed) => (breed.name === TestingBreedNameWithoutSub);
        const initialBreeds: IBreed[] = [{ name: 'x', sub: [] }, { name: TestingBreedNameWithoutSub, sub: [] }];
        showRandomDogSuccessCommon(initialBreeds, fetchSpecificDogAction, nameChecker);
    });

    it('Generate breed (sub included) name correctly', () => {
        const nameChecker = (breed: IBreed) => (
            breed.name === TestingBreedNameWithoutSub &&
            breed.sub.length === 1 &&
            breed.sub[0] === TestingSubBreed &&
            breed.selectedSub === TestingSubBreed);
        const initialBreeds: IBreed[] = [{name: 'x', sub: []}, { name: TestingBreedNameWithoutSub, sub: [TestingSubBreed] }];
        showRandomDogSuccessCommon(initialBreeds, fetchSpecificDogActionWithSub, nameChecker);
    })

    function showRandomDogSuccessCommon(initialBreeds: IBreed[], action: IActionCommon, callback: (newSelectedBreed: IBreed) => {}) {
        const newState = Reducers.listOfDogs(Reducers.defaultListOfDogsState.set('breeds', initialBreeds), action);
        const newSelectedBreed = newState.get('selectedBreed');
        if(isBreed(newSelectedBreed)) {
            expect(callback(newSelectedBreed)).toBeTruthy();
        } else {
            throw new Error('Selected breed is not IBreed type');
        }
    }
});

describe(`Reduces - ${Actions.LOAD_LIST_OF_DOGS_SUCCESS} actiom`, () => {
    const sampleActionWithResponse = {
        response: {
            message: {
                "affenpinscher": [],
                "african": [],
                "bulldog": [
                    "boston",
                    "french"
                ]
            }
        },
        type: Actions.LOAD_LIST_OF_DOGS_SUCCESS
    }

    it('Generate first breed empty', () => {
        const newState = Reducers.listOfDogs(Reducers.defaultListOfDogsState, sampleActionWithResponse);
        const firstBreed: IBreed = newState.get('breeds')[0];
        expect(firstBreed.name === '' &&
            Array.isArray(firstBreed.sub) &&
            firstBreed.sub.length === 0 &&
            !!firstBreed.selectedSub === false).toBeTruthy();
    });
});