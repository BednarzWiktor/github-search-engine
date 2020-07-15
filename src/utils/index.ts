import { SearchUsersResponseData, SearchReposResponseData } from '@octokit/types';
import { SearchResultItem } from '../types/propTypes';

export const processResponseStatus = (status: number) => {
    if (status !== 200) {
        throw new Error(`request to GithubAPI returned with ${status} http error`);
    }
};

export const translateUsersResult = (result: SearchUsersResponseData['items']): Array<SearchResultItem> =>
    result.map(resultItem => ({
        origin: 'user',
        url: resultItem.html_url,
        name: resultItem.login
    }))
;

export const translateReposResult = (result: SearchReposResponseData['items']):Array<SearchResultItem> =>
    result.map(resultItem => ({
        origin: 'repo',
        url: resultItem.html_url,
        name: resultItem.name
    }))
;