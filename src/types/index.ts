import { SearchUsersResponseData, SearchReposResponseData } from '@octokit/types';

interface Result {
    [key: string]: SearchUsersResponseData['items'] | SearchReposResponseData['items'];
}

interface Error {
    [key: string]: string | null;
}

export type SliceState = {
    result: Result;
    isLoading: Boolean;
    error: Error;
};

export interface ResultAction {
    target: 'users' | 'repositiories';
    result: SearchUsersResponseData['items'] | SearchReposResponseData['items']
}

export interface IsLoadingAction {
    isLoading: Boolean
}

export interface ErrorAction {
    target: 'users' | 'repositiories';
    result: string | null
}