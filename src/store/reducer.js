import {ACTION_TYPES} from "./action"
import {combineReducers} from "redux"
const businessesReducer = (state=null,action) => {
    switch(action.type){
        case ACTION_TYPES.UPDATE_BUSINESSES:
            return action.payload
        default:
        return state;
        
    }
}
const setLocationReducer = (state=null, action) => {
    switch(action.type){
        case ACTION_TYPES.SET_LOCATION:
            return action.payload
        default:
        return state;
        
    }
}

const setDistanceReducer = (state=8046, action) => { //8046 meter  ~ 5miles
    switch(action.type){
        case ACTION_TYPES.SET_DISTANCE:
            return action.payload
        default:
        return state;
        
    }
}

const setBusinessTypeReducer = (state='restaurant',action) => { // default business type
    switch(action.type){
        case ACTION_TYPES.SET_BUSINESS_TYPE:
            return action.payload
        default:
        return state;
        
    }
}
export default combineReducers({
    businesses: businessesReducer,
    currentLocation:setLocationReducer,
    currentDistance: setDistanceReducer,
    businessType: setBusinessTypeReducer
    
})