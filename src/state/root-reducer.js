import { combineReducers } from "redux"
import pageReducer from "./page/page.reducers"
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const rootReducer = combineReducers({
  page: pageReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['page']
}

export default persistReducer(persistConfig, rootReducer);