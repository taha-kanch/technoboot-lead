import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    data: [],
    error: [],
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0
}

const leadSlice = createSlice({
    name: 'leadList',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successLeadReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.data = action.payload.data;
            state.total = action.payload.total;
            state.limit = action.payload.limit;
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
        },
        failedLeadReducer: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { successLeadReducer, failedLeadReducer, loaderListener } = leadSlice.actions;

export default leadSlice.reducer;