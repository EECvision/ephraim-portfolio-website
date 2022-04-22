import { createSelector } from "reselect"

const selectPage = state => state.page

export const selectCurrentPage = createSelector (
  [selectPage],
  page => page.currentPage
)

export const selectInview = createSelector(
  [selectPage],
  page => page.inview
)

export const selectView = createSelector(
  [selectPage],
  page => page.view
)

export const selectWelcomeScreen = createSelector(
  [selectPage],
  page => page.welcomeScreen
)

export const selectMount = createSelector(
  [selectPage],
  page => page.mount
)

export const selectReload = createSelector(
  [selectPage],
  page => page.reload
)