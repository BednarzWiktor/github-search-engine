import { Dispatch } from '@reduxjs/toolkit';

import { githubAPI } from '../../../githubAPI';

import { setResultByTarget, setIsLoading } from '../../../features/search/slice';

const gAPI = githubAPI();

export const getSearchResults = (searchPhrase: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading({ isLoading: true }));

    const { items: usersResponseData } = await gAPI.getUsersByQuery(searchPhrase);
    const { items: reposResponseData } = await gAPI.getReposByQuery(searchPhrase);

    if (usersResponseData) {
        dispatch(setResultByTarget({
            target: 'users',
            result: usersResponseData
        }));
    }
    if (reposResponseData) {
        dispatch(setResultByTarget({
            target: 'repositories',
            result: reposResponseData
        }));
    }
    dispatch(setIsLoading({ isLoading: false }));
};