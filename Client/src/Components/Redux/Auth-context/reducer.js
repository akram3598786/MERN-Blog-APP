import * as types  from "./action-type.js";
import Cookies from 'universal-cookie';
// import { GetUpdatedUser } from "./action.js";

const cookie = new Cookies();
let token = cookie.get("AccessToken");
const loggedUser = cookie.get("loggedUser") || undefined;

let initState = {
    isAuth : loggedUser ? true : false,
    userData : loggedUser == undefined ? {} : loggedUser
}
// if(token) initState.isAuth = true;;
export const Authreducer=(state = initState, {type, payload} )=>{
    switch(type){

        case types.IS_AUTH : {
          return {...state, isAuth : payload}
        }
        case types.SAVE_USER : {
            return {...state, userData : payload}
        }
        case types.UPDATE_USER : {
            return {...state, userData : payload}
        }
        case types.DELETE_USER : {
            return {...state, userData : {}}
        }
        default :{
            return state
        } 
    }
}