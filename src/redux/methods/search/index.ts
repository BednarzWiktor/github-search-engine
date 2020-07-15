import { Dispatch } from '@reduxjs/toolkit';

import { githubAPI } from '../../../githubAPI';

import { setResultByTarget, setIsLoading, setErrorByTarget } from '../../../features/search/slice';

const gAPI = githubAPI();

export const getSearchResults = (searchPhrase: string, activeFilters: Array<string>) => async (dispatch: Dispatch) => {
    console.log(activeFilters);
    dispatch(setIsLoading({ isLoading: true }));

    const establishGAPIMethodToUse = (type: string) => {
        switch (type) {
            case 'users': return gAPI.getUsersByQuery;
            case 'repos': return gAPI.getReposByQuery;
        }
    };

    const data = new Promise(resolve => {
        activeFilters.forEach(async (filter, index) => {
            const fetchData = establishGAPIMethodToUse(filter);
    
            if (fetchData) {
                const { payload, error } = await fetchData(searchPhrase);
    
                dispatch(setResultByTarget({
                    target: filter,
                    result: payload && payload.items
                }));
                dispatch(setErrorByTarget({
                    target: filter,
                    error: error
                }));
            }

            if (index === activeFilters.length -1) resolve();
        });
    });

    data.then(() => {
        dispatch(setIsLoading({ isLoading: false }));
    })
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