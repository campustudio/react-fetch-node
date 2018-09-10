import $ from 'jquery'

export default {
    setUserProfile: (profile) => {
      // console.log('into action setUserProfile profile: ', profile)
      return (dispatch, getState) => {
          dispatch({
              type: 'SET_USER_PROFILE',
              profile,
          })
      }
    },
    apiRequest: () => {
        return dispatch => {
            $.ajax({
                url: 'https://www.baidu.com',
                success() {
                    console.log('SUCCESS');
                },
                error() {
                    console.log('ERROR');
                    dispatch({
                        type: 'SHOW_ERROR',
                        payload: {
                            name: 'ERROR!!'
                        },
                    })
                }
            })
        }
    }
}

// export function showError() {
//     return {
//         type: 'SHOW_ERROR',
//         payload: {
//             name: 'ERROR!!'
//         },
//     }
// }

// export function setUserProfile(profile) {
//     return {
//         type: 'SET_USER_PROFILE',
//         profile,
//     }
// }

// export function apiRequest(profile) {
//     return dispatch => {
//         $.ajax({
//             url: 'www.baidu.com',
//             success() {
//                 console.log('SUCCESS');
//             },
//             error() {
//                 console.log('ERROR');
//                 dispatch({
//                     type: 'SHOW_ERROR',
//                     payload: {
//                         name: 'ERROR!!'
//                     },
//                 })
//             }
//         })
//     }
// }