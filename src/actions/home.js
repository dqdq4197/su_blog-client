import {
    HOME_LOAD_REQUEST,
    HOME_LOAD_SUCCESS,
    HOME_MORE_REQUEST,
    HOME_MORE_SUCCESS
} from './ActionTypes';

export function home_load_request() {
    return {
        type: HOME_LOAD_REQUEST,
    }
}
export function home_load_success() {
    return {
        type: HOME_LOAD_SUCCESS,
    }
}
export function home_more_request() {
    return {
        type: HOME_MORE_REQUEST,
    }
}
export function home_more_success() {
    return {
        type: HOME_MORE_SUCCESS,
    }
}