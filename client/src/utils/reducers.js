import { useReducer } from "react";
import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_JOBS
} from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            }
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }
        case UPDATE_JOBS:
            return {
                ...state,
                jobs: action.jobs
            }
        default:
            return state;
    }
}

export function useJobReducer(initialState) {
    return useReducer(reducer, initialState)
}