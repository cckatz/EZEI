import firebase from '../config/firebaseConfig';

import {
  ACTIVITY_UPDATE,
  ACTIVITY_CREATE,
  ACTIVITY_CREATE_SUCCESS,
  ACTIVITY_CREATE_ERROR,
  ACTIVITIES_FETCH_SUCCESS,
  ACTIVITIES_FETCH_ERROR,
  ACTIVITIES_SAVE_SUCCESS,
  ACTIVITIES_SAVE_ERROR,
  ADD_GOAL_SUCCESS,
  ADD_GOAL_ERROR,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_ERROR,
  FETCH_SKILLS_SUCCESS,
  FETCH_SKILLS_ERROR
} from './types';

const db = firebase.firestore()

export const addGoal = (skillId, activityId, goal) => async dispatch =>{
	console.log("in activity create")
	try{
		var activityRef = await db.collection(`activities/${skillId}/activities`).doc(activityId);
		await activityRef.update({ byAge: {age: [goal.age], data: firebase.firestore.FieldValue.arrayUnion(goal.data)} })
			.then(()=>{
				console.log("Document successfully added with firebase id!");
				dispatch({ type: ADD_GOAL_SUCCESS })
			})
	} catch(error){
		console.error("Error updating document: ", error);
        dispatch({ type: ADD_GOAL_ERROR })

	}

};

export const fetchGoals = (id) => async dispatch => {
	  //   console.log('in get activities')
	  //   let goalsRef = await db.collection(`activities/${id}/byAge`).get()
	  // .then(snapshot => {
	  //   if (snapshot.empty) {
	  //     console.log('No matching documents.');
	  //   }  
	  //   var goals = []
	  //   snapshot.forEach(doc => {
	  //       goals.push({id: doc.id, data: doc.data()})
	  //     console.log(doc.id, '=>', doc.data());

	  //   });
	  //   dispatch({type: FETCH_GOALS_SUCCESS, payload: goals})

	  // })
	  // .catch(err => {
	  //   console.log('Error getting documents', err);
	  //   dispatch({type: FETCH_GOALS_ERROR, payload: err})
	  // });

}

export const activityCreate = (title, type, id) => async dispatch =>{
	console.log("in activity create")
	try{
		let docRef = await db.collection(`activities/${id}/activities`).add({
			title, type, id, byAge: []
		})
		console.log("Document written with ID: ", docRef.id);
		var activityRef = await db.collection(`activities/${id}/activities`).doc(docRef.id);
		await activityRef.update({ id: docRef.id })
			.then(()=>{
				console.log("Document successfully updated with firebase id!");
				dispatch({ type: ACTIVITY_CREATE_SUCCESS, payload: {skillId: id, docId: docRef.id} })
				dispatch(activitiesFetch())

			})	
	} catch(error){
		console.error("Error adding document: ", error);
        dispatch({ type: ACTIVITY_CREATE_ERROR })

	}
};

export const activitiesUpdate = () => async dispatch => {
	activitiesFetch()
	dispatch({type:"UPDATE_ACTIVITIES"})
}

export const activitiesFetch = () => async dispatch =>{
	    // console.log('in get activities')
// 	    let eventsRef = db.collection('activities').get()
// 	  .then(snapshot => {
// 	    if (snapshot.empty) {
// 	      console.log('No matching documents.');
	      
// 	    }  
// 	    var activities = []
// 	    var list = {}
// 	    snapshot.forEach(doc => {
// 	    	list[doc.id] = []
// 	    	 activityListRef = db.collection(`activities/${doc.id}/activities`).get()
// 	        	.then(dataSnapshot=> {
// 	        		if(dataSnapshot.empty){
// 	        			console.log('no activities')
// 	        		}
// 	        		// console.log('there are activities')
// 	        		dataSnapshot.forEach((activityDoc) => {
// 	        				list[doc.id].push({id: activityDoc.id, ...activityDoc.data()})
// 	        		})
// 	        		})

// 	        		activities.push({...doc.data(), list: list[doc.id] })
// 	      // console.log(doc.id, '=>', doc.data());
// 	        	})

// 	    		dispatch({type: ACTIVITIES_FETCH_SUCCESS, payload: activities})
// })
// 	  .catch(err => {
// 	    console.log('Error getting documents', err);
// 	    dispatch({type: ACTIVITIES_FETCH_ERROR, payload: err})
// 	  });

};
// export const activitiesFetch = () => async dispatch =>{
// 	    // console.log('in get activities')
// 	    let activitiesRef = db.collection('activities')
// 	    .onSnapshot(snapshot => {

// 	    var activities = []
// 	    var list = {}
// 	    snapshot.forEach(doc => {
// 	    	list[doc.id] = []
// 	    	 activityListRef = db.collection(`activities/${doc.id}/activities`).get()
// 	        	.then(dataSnapshot=> {
// 	        		if(dataSnapshot.empty){
// 	        			console.log('no activities')
// 	        		}
// 	        		// console.log('there are activities')
// 	        		dataSnapshot.forEach((activityDoc) => {
// 	        				list[doc.id].push({id: activityDoc.id, ...activityDoc.data()})
// 	        		})
// 	        		})

// 	        		activities.push({...doc.data(), list: list[doc.id] })
// 	        	})

// 	    		dispatch({type: ACTIVITIES_FETCH_SUCCESS, payload: activities})


// 	    })


// };

