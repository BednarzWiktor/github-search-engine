import { Dispatch } from '@reduxjs/toolkit';

import { githubAPI } from '../../../githubAPI';

import { setResultByTarget, setIsLoading, setErrorByTarget } from '../../../features/search/slice';

const gAPI = githubAPI();

const getActionToDispatchForSingleRequest = async (searchPhrase: string, type: 'users' | 'repos') => {
    const methodToUse = type === 'users' ? gAPI.getUsersByQuery : gAPI.getReposByQuery;
    const { payload, error } = await methodToUse(searchPhrase);
        
    if (payload) {
        return setResultByTarget({
            target: type,
            result: payload.items
        });
    } else {
        return setErrorByTarget({
            target: type,
            error: error
        });
    }
}

export const getSearchResults = (searchPhrase: string, activeFilters: Array<string>) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading({ isLoading: true }));

    if (activeFilters.includes('users')) {
        dispatch(await getActionToDispatchForSingleRequest(searchPhrase, 'users'));
    }

    if (activeFilters.includes('repos')) {
        dispatch(await getActionToDispatchForSingleRequest(searchPhrase, 'repos'));
    }

    dispatch(setIsLoading({ isLoading: false }));
};

export const clearSearchResults = () => (dispatch: Dispatch) => {
    dispatch(setResultByTarget({
        target: 'users',
        result: []
    }));
    dispatch(setResultByTarget({
        target: 'repos',
        result: []
    }));
};

export const clearError = () => (dispatch: Dispatch) => {
    dispatch(setErrorByTarget({
        target: 'users',
        error: null
    }));
    dispatch(setErrorByTarget({
        target: 'repos',
        error: null
    }));
}