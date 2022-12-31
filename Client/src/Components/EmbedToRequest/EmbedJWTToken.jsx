import axios from "axios";
import Cookies from 'universal-cookie';

export default function EmbedJWTToken(url){

    const cookies= new Cookies();
    let token = cookies.get('AccessToken');
    const authAxios = axios.create({
        baseURL: url,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return authAxios;
}