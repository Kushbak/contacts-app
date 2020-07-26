import { createStore, combineReducers, applyMiddleware } from "redux"; 
// import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";  
import { getUsersApi } from '../api/api' 




// REDUCER FOR USERS 

let initialState = {
    users: []
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.users
            }
        default:
            return state;
    }
}

//  ACTIONS FOR USERS 

export const getUsersSuccess = (users) => ({ type: 'GET_USERS', users });

export const getUsers = () => (dispatch) => {
    getUsersApi()
        .then(res => { 
            dispatch(getUsersSuccess(res.data.data)); 
    })    
};




let reducers = combineReducers({ 
    usersData: usersReducer,  
    // form: formReducer 
});
let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;
export default store;