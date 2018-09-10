import { combineReducers } from 'redux'
import userProfile from './userProfile'

const rootReducer = combineReducers({
    userProfile: userProfile
})

export default rootReducer
