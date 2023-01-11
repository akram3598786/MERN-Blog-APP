import * as types from "./action-type.js";

let initState = {
    published: []
}

export const PublishedBogReducer=(state=initState, action)=>{
const {type, payload} = action;

switch(type){

    case types.GET_PUBLSHED_BLOGS : {
        return {...state, published : [...payload]}
    }
    default : {
        return state;
    }
}
}