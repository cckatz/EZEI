import {
	ADD_GOAL,
	ADD_GOAL_SUCCESS,
	ADD_GOAL_ERROR,
	FETCH_GOALS_SUCCESS,
	FETCH_GOALS_ERROR,
	ACTIVITY_UPDATE,
	ACTIVITY_CREATE,
	ACTIVITY_SAVE_SUCCESS,
	ACTIVITY_CREATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	title: '',
	type: '',
	skillId: '',
	uid: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_GOAL:
			return action.payload;
		case ADD_GOAL_SUCCESS:
			return {INITIAL_STATE};
		case ADD_GOAL_ERROR:
			return {INITIAL_STATE};
		case ACTIVITY_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case ACTIVITY_CREATE:
			return INITIAL_STATE;
		case ACTIVITY_CREATE_SUCCESS:
			return action.payload;
		case ACTIVITY_SAVE_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
};
