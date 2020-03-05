import {
    POST_PICK,
    POSTER_LOAD_REQUEST,
    POSTER_LOAD_SUCCESS,
    POSTER_OUTPUT_DATA,
} from './ActionTypes';

export function postShowRequest(id) {
    return {
        type: POST_PICK,
        id
    };
};
export function posterLoadRequest() {
    return {
        type: POSTER_LOAD_REQUEST,
    };
};
export function posterLoadSuccess() {
    return {
        type: POSTER_LOAD_SUCCESS,
    };
};
export function posterOutputData(data) {
    return {
        type: POSTER_OUTPUT_DATA,
        data
    };
};

