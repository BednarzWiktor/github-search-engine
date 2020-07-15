import { SearchUsersResponseData, SearchReposResponseData } from '@octokit/types';

interface Result {
    [key: string]: SearchUsersResponseData['items'] | SearchReposResponseData['items'];
}

export type SliceState = {
    result: Result;
    isLoading: Boolean;
};

export interface ResultAction {
    target: 'users' | 'repositiories';
    result: SearchUsersResponseData['items'] | SearchReposResponseData['items']
}

export interface IsLoadingAction {
    isLoading: Boolean
}