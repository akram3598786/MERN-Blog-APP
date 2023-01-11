import * as types from './action-type.js';

export const getPublishedDone=(data)=>{
    return {
        type : types.GET_PUBLSHED_BLOGS,
        payload : data
    }
}

