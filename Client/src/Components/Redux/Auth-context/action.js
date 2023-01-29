import { useState } from "react";
import EmbedJWTToken from "../../EmbedToRequest/EmbedJWTToken.jsx"
import * as types from "./action-type.js";


export const isAuthHandler=(authFlg)=>{
  return {
    type : types.IS_AUTH,
    payload : authFlg
  }
}

export const saveUser = (userData)=>{
  return {
    type : types.SAVE_USER,
    payload : userData
  }
}

export const updateUser = (userData)=>{
  return {
     type : types.UPDATE_USER,
     payload : userData
  }
}
export const DeleteUser = ()=>{
  return {
     type : types.DELETE_USER
  }
}


 const GetUser = async (userId)=>{

  let url = `http://localhost:8080/user/${userId}`;
  const authAxios = EmbedJWTToken(url);
 
 authAxios.get(url).
  then((res)=>{
    console.log("Before",res.data)
    return res.data;
  }).
  catch((err)=>console.log(err))

}

export const GetUpdatedUser=async(userId)=>{
  try{
   await GetUser(userId).then((res)=>console.log("After",res))
    // console.log("First Most")
    // let user = await GetUser(userId);
  }catch(err){
    console.log(err);
  }
}