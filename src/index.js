import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import "../node_modules/fullcalendar/dist/fullcalendar.min.js";
// import UIreducer from "./store/reducers/layout";
import { reducers } from "./store/reducers/index";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import httpIntercept from "../src/interceptor/interceptor";
import "./Theming/theming.scss";

const rootReducer = combineReducers({
  layout: reducers.layout,
  auth: reducers.auth,
});

const persistConfig = {
  key: "root",
  storage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE || compose;

const store = createStore(
  rootReducer,
  window.REDUX_INITIAL_DATA,
  composeWithDevTools(applyMiddleware(logger))
);
// let persistor = persistStore(store);

const app = (
  <>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  </>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
