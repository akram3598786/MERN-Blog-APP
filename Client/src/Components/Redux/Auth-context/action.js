import { IS_AUTH } from "./action-type.js"

export const isAuthHandler=(authFlg)=>{
  return {
    type : IS_AUTH,
    payload : authFlg
  }
}