import { SliceState, ResultAction, IsLoadingAction } from '../../types';

import { createSlice } from '@reduxjs/toolkit';

export const initialState: SliceState = {
    result: {
        users: [],
        repositories: []
    },
    isLoading: false
};

const users = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setResultByTarget(state, action) {
            const { target, result }: ResultAction = action.payload;

            state.result[target] = result;
        },
        setIsLoading(state, action) {
            const { isLoading }: IsLoadingAction = action.payload;

            state.isLoading = isLoading;
        }
    }
});

export const { setResultByTarget, setIsLoading } = users.actions;

export default users.reducer;