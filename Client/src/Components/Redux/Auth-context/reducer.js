import { IS_AUTH } from "./action-type.js";
import Cookies from 'universal-cookie';

const cookie = new Cookies();
let token = cookie.get("AccessToken");
const loggedUser = cookie.get("loggedUser") || undefined;
let initState = {
   isAuth : loggedUser ? true : false
}
// if(token) initState.isAuth = true;;
export const Authreducer=(state = initState, {type, payload} )=>{
    switch(type){

        case IS_AUTH : {
          return {...state, isAuth : payload}
        }
        default :{
            return state
        } 
    }
}