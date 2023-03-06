import { combineReducers } from 'redux';

const userInfo = (state = {}, action) => {
    console.log("useinfo", action.action)
    if(action.action == undefined) return {
        ...state
    }
    
    if(action.action.type == "userInfo") {

        return {
            ...state,
            userInfo: action.action.value           
        }
    } else {
        return {
            ...state,
            referralReward: action.action.value
        }
    
    }
}

const pendingReward = (state = {}, action) => {
    return{
        ...state,
        pendingReward: action
    }
}

const referralReward = (state = {}, action) => {
    console.log("referralReward", state)
    return {
        ...state,
        referralReward: action
    }
}

const walletBalance = (state = {}, action) => {
    return {
        ...state,
        walletBalance: action
    }
}
const rootReducer = combineReducers({
    userInfo,
    pendingReward,
    referralReward,
    walletBalance
})
export default rootReducer;