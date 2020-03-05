import * as types from '../actions/ActionTypes';

const initialState = {
    posterId :'',
    posterModifyData: '',
};

export default function posterModify(prevState=initialState, action) {
    switch(action.type) {
        case types.POSTER_MODIFY_DATA :
            return {
                ...prevState,
                posterId:action.id,
                posterModifyData: action.modifyData
            }
        default :
            return prevState;
    }
}