import { createSelector } from '@reduxjs/toolkit';

import { translateUsersResult, translateReposResult } from '../../../utils';

const selectResultUsers = (state: any) => state.search.result.users;
const selectResultRepositories = (state: any) => state.search.result.repositories;

export const selectTranslatedAndSortedSearchResult = createSelector(
    selectResultUsers,
    selectResultRepositories,
    (resultUsers, resultRepositories) => {
        const translatedUsers = translateUsersResult(resultUsers);
        const translatedRepositories = translateReposResult(resultRepositories);

        return [ ...translatedUsers, ...translatedRepositories ]
            .sort((a, b) => a > b ? -1 : 1)
            .slice(0, 50)
        ;
    }
)