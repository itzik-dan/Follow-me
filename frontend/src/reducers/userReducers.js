import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	UPDATE_FOLLOW,
	UPDATE_PIC
} from "../types/userTypes";

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case UPDATE_FOLLOW:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					followers: action.payload.followers,
					following: action.payload.following,
				}
			};
		case USER_LOGOUT:
			return {};
		case UPDATE_PIC:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					photo: action.payload
				}
			};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};