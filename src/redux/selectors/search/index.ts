import { createSelector } from '@reduxjs/toolkit';

import { sortBy } from 'lodash';

import { translateUsersResult, translateReposResult } from '../../../utils';

const selectResultUsers = (state: any) => state.search.result.users;
const selectResultRepos = (state: any) => state.search.result.repos;
const selectIsLoading = (state: any) => state.search.isLoading;
const selectErrorUsers = (state: any) => state.search.error.users;
const selectErrorRepos = (state: any) => state.search.error.repos;

export const selectTranslatedAndSortedSearchResult = createSelector(
    selectResultUsers,
    selectResultRepos,
    selectIsLoading,
    (resultUsers, resultRepos, isLoading) => {
        const translatedUsers = translateUsersResult(resultUsers);
        const translatedRepos = translateReposResult(resultRepos);

        return !isLoading ? sortBy([ ...translatedUsers, ...translatedRepos ], item => item.name.toLowerCase()).slice(0, 50) : [];
    }
);

export const selectError = createSelector(
    selectErrorUsers,
    selectErrorRepos,
    (errorUsers, errorRepos) => errorUsers || errorRepos
);