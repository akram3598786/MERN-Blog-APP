import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Blog.style.css";


export default function EditBlog(){

    const [tit, settitle] = useState("");
    const [des, setdes] = useState("");
    const {blogId} = useParams();

    useEffect(()=>{
        getData();      
    }, []);
    
   function getData(){
    
    let url = `https://mern-app-blog-ver01.onrender.com/post/${blogId}`;
    axios.get(url).
    then((res)=>{
        // console.log(res.data);
        setdes(res.data.description);
        settitle(res.data.title);
    }).
    catch((err)=>console.log(err))
   }
    
    const handleUpdate=()=>{
        // let userData = JSON.parse(localStorage.getItem("LoggedUser"));
        let payload = {
            title : tit,
            description : des
        }
        // let url = `https://mern-app-blog-ver01.herokuapp.com/post/edit/${blogId}`;
        let url = `https://mern-app-blog-ver01.onrender.com/post/edit/${blogId}`;
        axios.patch(url, payload).
        then((res)=>{
            if(res.status === 200) alert("Blog Edited");
            else alert("Something wrong !");
        }).catch((err)=>{
            console.log(err);
        });
    }

    return (
        <>
        <h2>Edit Blog </h2> 
        <div className="inputSec">
            <form>
         <input className="title" type="text" name="" id="title" value={tit} onChange={(e)=>settitle(e.target.value)}  placeholder="Title"/>
         <textarea type="text" name="" id="" value={des} onChange={(e)=>setdes(e.target.value)}  placeholder="Description"/> <br />
         </form>
         <button onClick={handleUpdate}>Post</button>
         </div>
        </>
    )
}