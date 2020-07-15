import { SearchUsersResponseData, SearchReposResponseData } from '@octokit/types';
import { SearchResultItem } from '../types/propTypes';

export const processResponseStatus = (status: number): string | null =>
    status !== 200 ? `request to GithubAPI returned with ${status} http error` : null
;

export const translateUsersResult = (result: SearchUsersResponseData['items']): Array<SearchResultItem> =>
    result && Array.isArray(result) ? result.map(resultItem => ({
        origin: 'user',
        url: resultItem.html_url,
        name: resultItem.login
    })) : []
;

export const translateReposResult = (result: SearchReposResponseData['items']):Array<SearchResultItem> =>
    result && Array.isArray(result) ? result.map(resultItem => ({
        origin: 'repo',
        url: resultItem.html_url,
        name: resultItem.name
    })) : []
;

export const generateUpdatedFilters = (filters: Array<string>, type: 'users' | 'repos'): Array<string> =>
    filters && Array.isArray(filters)
        ? filters.includes(type)
            ? filters.filter(filterType => filterType !== type)
            : [ ...filters, type ]
        : []
;