import initialState from '../store/initialState'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)
  console.log('into userProfile reducer updatedState: ', updatedState)
  switch(action.type) {
      case 'SET_USER_PROFILE':
        updatedState = action.profile
        // console.log('=======after SET_USER_PROFILE updatedState=========', updatedState)
        return updatedState
      case 'SHOW_ERROR':
        updatedState = action.payload
        // console.log('=======after SET_USER_PROFILE updatedState=========', updatedState)
        return updatedState
      default:
        return currentState || initialState.userProfile
  }
}
