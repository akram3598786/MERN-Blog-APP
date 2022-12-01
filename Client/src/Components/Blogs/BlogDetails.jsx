import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


export default function BlogDetails(){

    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false);
    const [blog, setblog] = useState({});
    const {blogId} = useParams();

    useEffect(() => {
        setloading(true);
        getBlog();
    }, [])

    const getBlog = () => {
        let userData = JSON.parse(localStorage.getItem("LoggedUser"));
       // console.log(userData._id);
        // let url = `http://127.0.0.1:8080/post/${blogId}`;
        let url = `https://mern-app-blog-ver01.herokuapp.com/post/${blogId}`;
        axios.get(url).
            then((res) => {
                // console.log(res.data)
                setblog(res.data)
            }).
            catch((err) => {
                console.log(err)
                setError(true)
            }).
            finally((res) => setloading(false));
    }
    
    //console.log(blogId);
    return (
        <>
        <h1>Blog View</h1>
            <div id="blogView">
                {
                    loading ? <h1>Loading...</h1> :
                        error ? <h1>Error : Something Went Wrong</h1> :
                          <>
                           <h1>{blog.title}</h1>
                           <p>{blog.description}</p>
                           </>
                }

            </div>
        </>
    )
}