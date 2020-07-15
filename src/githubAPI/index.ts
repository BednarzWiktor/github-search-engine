import { Octokit } from '@octokit/rest';

import { processResponseStatus } from '../utils';

export const githubAPI = () => {
    const octokit = new Octokit({
        baseUrl: 'https://api.github.com'
    });

    const getUsersByQuery = async (query: string, limit: number = 50) => {
        const { data, status } = await octokit.search.users({
            q: query,
            per_page: 50
        });
        processResponseStatus(status);

        return data;
    };

    const getReposByQuery = async (query: string) => {
        const { data, status } = await octokit.search.repos({
            q: query,
            per_page: 50
        });
        processResponseStatus(status);

        return data;
    };

    return {
        getUsersByQuery,
        getReposByQuery
    };
};