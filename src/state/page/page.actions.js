import pageActionTypes from "./page.types";

export const setCurrentPage = page => ({
  type: pageActionTypes.SET_CURRENT_PAGE,
  payload: page
})

export const setActiveProject = projectId => ({
  type: pageActionTypes.SET_ACTIVE_PROJECT,
  payload: projectId
})

export const setInview = projectId => ({
  type: pageActionTypes.SET_INVIEW,
  payload: projectId
})

export const setView = state => ({
  type: pageActionTypes.SET_VIEW,
  payload: state
})

export const setWelcomeScreen = state => ({
  type: pageActionTypes.SET_WELCOME_SCREEN,
  payload: state
})

export const setMount = () => ({
  type: pageActionTypes.SET_MOUNT
})