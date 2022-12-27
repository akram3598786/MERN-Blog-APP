import axios from "axios";

export default function EmbedJWTToken(url){

    let token = localStorage.getItem("token");
    const authAxios = axios.create({
        baseURL: url,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return authAxios;
}