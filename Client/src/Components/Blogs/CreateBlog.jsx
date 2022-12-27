import axios from "axios";
import { useState } from "react";
import EmbedJWTToken from "../EmbedToRequest/EmbedJWTToken";
import "./Blog.css";


export default function CreateBlog() {

    const [tit, settitle] = useState("");
    const [des, setdes] = useState("");

    const handlePost = () => {
        if (tit.length === 0 || des.length === 0) {
            alert("Kindly complete your blog inputs !")
        } else {

            let userData = JSON.parse(localStorage.getItem("LoggedUser"));
            let payload = {
                title: tit,
                description: des,
                createdby: userData._id
            }

            // let url = `http://localhost:8080/post/${userData._id}`;
            let url = `https://mern-app-blog-ver01.onrender.com/post/${userData._id}`;

            const authAxios = EmbedJWTToken(url);
            authAxios.post(url, payload).
                then((res) => {
                    if (res.status === 201) alert("Blog Posted");
                    else alert("Something wrong !");
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    settitle("");
                    setdes("");
                })
        }
    }

    return (
        <>
            <h2>Create Blog </h2>
            <div className="inputSec">
                <form>
                    <input className="title" type="text" name="" id="title" value={tit} onChange={(e) => settitle(e.target.value)} placeholder="Title" />
                    <textarea type="text" name="" id="" value={des} onChange={(e) => setdes(e.target.value)} placeholder="Description" /> <br />
                </form>
                <button onClick={handlePost}>Post</button>
            </div>
        </>
    )
}