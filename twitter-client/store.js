import { applyMiddleware, createStore , compose } from "redux";
import createSagaMiddleware from "redux-saga";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "./reducers";
// import fetchTweets from "./sagas/tweets";
import rootSaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,compose(applyMiddleware(logger), applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
// const action = type => store.dispatch({ type });

export default store;
