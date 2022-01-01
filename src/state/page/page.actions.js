import pageActionTypes from "./page.types";

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