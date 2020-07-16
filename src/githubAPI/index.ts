import { Octokit } from '@octokit/rest';

import { processError } from '../utils';

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
            const { data } = response;
    
            return { payload: data, error: null };
        } catch (error) {
            return { payload: null, error: processError(error) };
        }
    };

    const getReposByQuery = async (query: string, limit: number = 50) => {
        try {
            const response = await octokit.search.repos({
                q: `${query}+in:name`,
                per_page: limit
            });
            const { data } = response;
    
            return { payload: data, error: null };
        } catch (error) {
            return { payload: null, error: processError(error) };
        }
    };

    return {
        getUsersByQuery,
        getReposByQuery
    };
};