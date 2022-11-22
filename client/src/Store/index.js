import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "../Reducer/index";

// var store = createStore(reducer,(
//   applyMiddleware(thunk)
// ));

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
