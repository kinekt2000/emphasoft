import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";

import apiReducer from "@modules/api/reducer";
import storageReducer from "@modules/storage/reducer";
import apiRootSaga from "@modules/api/saga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const reducer = combineReducers({
    api: apiReducer,
    storage: storageReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(apiRootSaga)

export default store