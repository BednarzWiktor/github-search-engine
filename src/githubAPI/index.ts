import { Octokit } from '@octokit/rest';

import { processResponseStatus } from '../utils';

export const githubAPI = () => {
    const octokit = new Octokit({
        baseUrl: 'https://api.github.com'
    });

    const getUsersByQuery = async (query: string, limit: number = 50) => {
        try {
            const response = await octokit.search.users({
                q: `${query}+in:login`,
                per_page: limit
            });
            const { data, status } = response;
            const statusError = processResponseStatus(status);
    
            return { payload: data, error: statusError };
        } catch (error) {
            return { payload: null, error: error.message };
        }
    };

    const getReposByQuery = async (query: string, limit: number = 50) => {
        try {
            const response = await octokit.search.repos({
                q: `${query}+in:name`,
                per_page: limit
            });
            const { data, status } = response
            const statusError = processResponseStatus(status);
    
            return { payload: data, error: statusError };
        } catch (error) {
            return { payload: null, error: error.message };
        }
    };

    return {
        getUsersByQuery,
        getReposByQuery
    };
};