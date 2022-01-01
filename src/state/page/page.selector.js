import { createSelector } from "reselect"

const selectPage = state => state.page

export const selectCurrentPage = createSelector (
  [selectPage],
  page => page.currentPage
)

export const selectActiveProject = createSelector(
  [selectPage],
  page => page.activeProject
)

export const selectInview = createSelector(
  [selectPage],
  page => page.inview
)

export const selectView = createSelector(
  [selectPage],
  page => page.view
)