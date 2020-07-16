import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { getSearchResults } from './';

const mockStore = configureStore([thunk]);

describe('search methods', () => {
    let store;

    beforeEach(() => {
        store = mockStore();
    });

    afterEach(() => {
        nock.cleanAll();
    });

    const baseUrl = 'https://api.github.com';
    const usersEPWithQuery = '/search/users?q=test+in%3Alogin&per_page=50';
    const reposEPWithQuery = '/search/repositories?q=test+in%3Aname&per_page=50';
    const usersResponse = {
        "status": 200,
        "total_count": 47397,
        "incomplete_results": false,
        "items": [ 1, 2, 3 ]
    };
    const reposResponse = {
        "status": 200,
        "total_count": 3,
        "incomplete_results": true,
        "items": [ 4, 5, 6 ]
    };
    const usersResponseInvalid = {
        "status": 404
    };
    const reposReponseInvalid = {
        "status": 403
    }

    describe('getSearchResults', () => {
        it('properly calls setIsLoading actions', async () => {
            const expectedActions = {
                start: { type: 'search/setIsLoading', payload: { isLoading: true } },
                finish: { type: 'search/setIsLoading', payload: { isLoading: false } },
            };

            nock(baseUrl)
                .get(usersEPWithQuery)
                .reply(200, usersResponse);
            nock(baseUrl)
                .get(reposEPWithQuery)
                .reply(200, reposResponse);

            await store.dispatch(getSearchResults('test', [ 'users' ]));
            const receivedActions = store.getActions()

            expect(receivedActions[0]).toEqual(expectedActions.start);
            expect(receivedActions[receivedActions.length -1]).toEqual(expectedActions.finish);
        });
        it('properly calls setResultByTarget actions on positive response', async () => {
            const expectedActions = {
                users: { type: 'search/setResultByTarget', payload: { target: 'users', result: [ 1, 2, 3 ] } },
                repos: { type: 'search/setResultByTarget', payload: { target: 'repos', result: [ 4, 5, 6 ] } },
            };

            nock(baseUrl)
                .get(usersEPWithQuery)
                .reply(200, usersResponse);
            nock(baseUrl)
                .get(reposEPWithQuery)
                .reply(200, reposResponse);

            await store.dispatch(getSearchResults('test', [ 'users', 'repos' ]));
            const receivedActions = store.getActions()

            expect(receivedActions[1]).toEqual(expectedActions.users);
            expect(receivedActions[2]).toEqual(expectedActions.repos);
        });
        it('properly calls setErrorByTarget actions on negative response', async () => {
            const expectedActions = {
                users: { type: 'search/setErrorByTarget', payload: { target: 'users', error: null } },
                repos: { type: 'search/setErrorByTarget', payload: { target: 'repos', error: 'Too many requests, please wait before continuing search' } },
            };

            nock(baseUrl)
                .get(usersEPWithQuery)
                .reply(404, usersResponseInvalid);
            nock(baseUrl)
                .get(reposEPWithQuery)
                .reply(403, reposReponseInvalid);

            await store.dispatch(getSearchResults('test', [ 'users', 'repos' ]));
            const receivedActions = store.getActions()

            expect(receivedActions[1]).toEqual(expectedActions.users);
            expect(receivedActions[2]).toEqual(expectedActions.repos);
        })
    });
});