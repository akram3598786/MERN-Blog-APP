
import {combineReducers, legacy_createStore} from "redux";
import { Authreducer} from "./Auth-context/reducer.js";

const rootReducer = combineReducers({
    isAuth : Authreducer 
});

export const store = legacy_createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
    store.subscribe(()=>{
        // console.log(store.getState());
    })