import pageActionTypes from "./page.types"

const INITIAL_STATE = {
  currentPage: 'home',
  inview: 1,
  view: false,
  welcomeScreen: true,
  mount: true,
  reload: true
}

const pageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pageActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
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
    case pageActionTypes.SET_WELCOME_SCREEN:
      return {
        ...state,
        welcomeScreen: action.payload
      }
    case pageActionTypes.SET_MOUNT: 
      return {
        ...state,
        mount: action.payload
      }
    case pageActionTypes.SET_RELOAD:
      return {
        ...state,
        reload: action.payload
      }
    default:
      return state
  }
}

export default pageReducer