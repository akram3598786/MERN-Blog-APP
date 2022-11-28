import { IS_AUTH } from "./action-type.js";

let initState = {
   isAuth :  false
}

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