import * as types from '../actions/ActionTypes'

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        valid: false,
        isLoggedIn: false,      //로그인 중인지
        currentUser: {
            user_id: '',               //유저 아이디
            user_email: '',      //유저 이메일
            user_nick: '',       //유저 닉네임
            profile_img_path:''  //프로필 이미지 경로
        }
    },
    result: null,
};

export default function authentication(prevState=initialState, action) {
   
    switch(action.type) {
        //LOGIN
        case types.AUTH_LOGIN_REQUEST:
            return {
                ...prevState,
                login: {
                    status : 'WAITING'
                }
            };
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...prevState,
                login: {
                    status:  'SUCCESS'
                },
                status: {
                    isLoggedIn: true ,
                    currentUser: {
                        ...prevState.status.currentUser,
                        user_id : action.id,
                        user_email : action.email,
                        user_nick : action.nick,
                        profile_img_path : action.path,
                    },
                }
            };
        case types.AUTH_LOGIN_INFO_SAVE:
            return {
                ...prevState,
                result:action.userinfo
            }
        case types.AUTH_LOGIN_FAILURE:
            return {
                login: {
                    status: 'FAILURE'
                },
                status: {
                    ...prevState,
                    isLoggedIn:false,
                    currentUser: {
                        user_email: '',   
                        user_nick: '',    
                        profile_img_path:''
                    },
                }
            };
        //  LOG_OUT
        case types.AUTH_LOGOUT:
            return {
                ...prevState,
                status: {
                    isLoggedIn: false,
                    currentUser: {
                        ...prevState.status.currentUser
                    },
                }
            };
        case types.AUTH_PROFILE_IMG_CHANGE_SUCCESS:
            return {
                ...prevState,
                status: {
                    ...prevState.status,
                    currentUser: {
                        ...prevState.status.currentUser,
                        profile_img_path: action.path
                    }
                }
            }
        default:
            return prevState;
    }
}