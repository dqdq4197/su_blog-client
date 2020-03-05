import {
    POSTER_MODIFY_DATA
} from './ActionTypes';

export function posterModifyData(id,modifyData) {
    return {
        type: POSTER_MODIFY_DATA,
        id,
        modifyData
    };
};