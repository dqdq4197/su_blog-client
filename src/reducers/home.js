import * as types from '../actions/ActionTypes';

const initialState = {
    isLoading : '',
    moreIsLoading:'',
};

export default function homeLoad(prevState=initialState, action) {

    switch(action.type) {

        case types.HOME_LOAD_REQUEST :
            return {
                ...prevState,
                isLoading: 'WAITING'
            }
        case types.HOME_LOAD_SUCCESS :
            return {
                ...prevState,
                isLoading: 'SUCCESS'
            }
        case types.HOME_MORE_REQUEST :
            return {
                ...prevState,
                moreIsLoading: 'WAITING'
            }
        case types.HOME_MORE_SUCCESS :
            return {
                ...prevState,
                moreIsLoading: 'SUCCESS'
            }
        default :
            return prevState
    }
}