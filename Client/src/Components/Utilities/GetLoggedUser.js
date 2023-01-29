import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

export default function getLoggedUser(){
    const cookie = new Cookies();
    const token = cookie.get("AccessToken");
    let loggedUser =  jwt_decode(token);
    return loggedUser;
}

