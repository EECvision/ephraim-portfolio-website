import pageActionTypes from "./page.types"

const INITIAL_STATE = {
  activeProject: '1',
  inview: 1,
  view: false
}

const pageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pageActionTypes.SET_ACTIVE_PROJECT:
      return {
        ...state,
        activeProject: action.payload
      }
    case pageActionTypes.SET_INVIEW:
      return {
        ...state,
        inview: action.payload
      }
    case pageActionTypes.SET_VIEW:
      return {
        ...state,
        view: action.payload
      }
    default:
      return state
  }
}

export default pageReducer