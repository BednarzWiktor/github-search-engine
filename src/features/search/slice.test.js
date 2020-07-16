import reducer, { initialState, setResultByTarget, setErrorByTarget, setIsLoading } from './slice';

describe('search slice', () => {
    it('should return the initial state on first run', () => {
        const nextState = initialState;
        const result = reducer(undefined, {});

        expect(result).toEqual(nextState);
    });

    describe('setResultByTarget', () => {
        const commonPayload = {
            result: [
                {
                    id: 1,
                    someKey: true,
                    otherKey: 'test'
                },
                {
                    id: 2,
                    someKey: false,
                    otherKey: null
                },
                {
                    id: 3,
                    someKey: true,
                    otherKey: 'test',
                    anotherKey: [ 'here' ]
                },
            ]
        };

        it('should properly set users result with users target', () => {
            const payload = { result: commonPayload.result, target: 'users' }
            const nextState = reducer(initialState, setResultByTarget(payload));
            const rootState = { search: nextState };

            expect(rootState.search.result.users).toEqual(payload.result);
        });
        it('should properly set repos result with repos target', () => {
            const payload = { result: commonPayload.result, target: 'repos' }
            const nextState = reducer(initialState, setResultByTarget(payload));
            const rootState = { search: nextState };

            expect(rootState.search.result.repos).toEqual(payload.result);
        });
    });
    describe('setErrorByTarget', () => {
        it('should properly set users error with users target', () => {
            const payload = { error: 'testErrorMessage', target: 'users' }
            const nextState = reducer(initialState, setErrorByTarget(payload));
            const rootState = { search: nextState };

            expect(rootState.search.error.users).toEqual(payload.error);
        });
        it('should properly set repos error with repos target', () => {
            const payload = { error: new Error('testError'), target: 'repos' }
            const nextState = reducer(initialState, setErrorByTarget(payload));
            const rootState = { search: nextState };

            expect(rootState.search.error.repos).toEqual(payload.error);
        });
    });
    describe('setIsLoading', () => {
        it('should properly set isLoading state', () => {
            const payload = { isLoading: true };
            const nextState = reducer(initialState, setIsLoading(payload));
            const rootState = { search: nextState };

            expect(rootState.search.isLoading).toEqual(payload.isLoading);
        })
    });
});