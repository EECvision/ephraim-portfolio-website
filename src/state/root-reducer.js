import { combineReducers } from "redux"
import pageReducer from "./page/page.reducers"

const rootReducer = combineReducers({
  page: pageReducer
})

export default rootReducer