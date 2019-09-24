import {
	ACTIVITIES_FETCH_SUCCESS,
	ACTIVITIES_FETCH_ERROR,
	FETCH_GOALS_SUCCESS,
	FETCH_GOALS_ERROR

} from '../actions/types';

const INITIAL_STATE = {activityList: [], goals: []};

const findActivity = (arr, id) => {
	return arr.find((skill)=>{
		return skill.id == id 
	})
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// case UPDATE_ACTIVITIES:
			// return {...state, activityList: [...activityList, ...activityList[] ]};
		case FETCH_GOALS_SUCCESS:
			return {INITIAL_STATE};
		case FETCH_GOALS_ERROR:
			return {INITIAL_STATE};
		case ACTIVITIES_FETCH_SUCCESS:
			console.log("hit the reducer")
			return {activityList: action.payload};
		default:
			return state;
	}
};
