import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import EmbedJWTToken from "../EmbedToRequest/EmbedJWTToken";
// import moment from 'moment';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import getLoggedUser from "../Utilities/GetLoggedUser";


export default function BlogDetails() {

    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false);
    const [blog, setblog] = useState({});
    const [dates, setdates] = useState({});
    const { blogId } = useParams();
    const [publishing, setpublishing] = useState(false);
    const [published,setpublished] = useState(false)

    useEffect(() => {
        setloading(true);
        getBlog();
    }, [])

    const setDate = (createdAt, updatedAt) => {
        let Credate = createdAt.split("T")[0].split(".")[0];
        let CreTime = createdAt.split("T")[1].split(".")[0];
        let Update = updatedAt.split("T")[0].split(".")[0];
        let UpdTime = updatedAt.split("T")[1].split(".")[0];

        const dt = {
            Credate: Credate,
            CreTime: CreTime,
            Update: Update,
            UpdTime: UpdTime
        }
        setdates(dt);
    }

    // Updating publish flag true after blog published =============

    const handleUpdate = () => {
        const loggedUser = getLoggedUser();
        let payload = {
           published : true
        }
         let url = `http://localhost:8080/post/edit/${blogId}`;
       // let url = `https://mern-app-blog-ver01.onrender.com/post/edit/${blogId}`;

        const authAxios = EmbedJWTToken(url);
        authAxios.patch(url, payload).
            then((res) => {
                if (res.status === 200) setpublished(true);
                else alert("Something wrong !");
            }).catch((err) => {
                console.log(err);
            })
    }

    // Getting Blog to display =====================================
    const getBlog = () => {
        let url = `http://localhost:8080/post/${blogId}`;
        // let url = `https://mern-app-blog-ver01.onrender.com/post/${blogId}`;

        const authAxios = EmbedJWTToken(url)
        authAxios.get(url).
            then((res) => {
                setDate(res.data.createdAt, res.data.updatedAt);
                setblog(res.data);
            }).
            catch((err) => {
                console.log(err)
                setError(true)
            }).
            finally((res) => setloading(false));
    }

    // Publishing Blog ======================================

    const handlePublish = () => {
        if (publishing) {
            alert("Wait for some time !");
        }
        else {
            setpublishing(true);
            const loggedUser = getLoggedUser();
            let url = `http://localhost:8080/publish/${loggedUser._id}`;
            //let url = `https://mern-app-blog-ver01.onrender.com/post/${loggedUser._id}`;

            const authAxios = EmbedJWTToken(url);
            authAxios.post(url, blog).
                then((res) => {
                    if (res.status === 201) {
                        handleUpdate();
                        alert("Blog Published Successfully");
                    }
                    else alert("Something wrong !");
                }).catch((err) => {
                    console.log(err);
                }).finally(() => setpublishing(false));
        }
    }


    //console.log(blogId);
    return (
        <div className="blogViewMainDiv">
            <div id="blogView" className="blogs">
                {
                    loading ? <h1>Loading...</h1> :
                        error ? <h1>Error : Something Went Wrong</h1> :
                            <>
                                <Button rightIcon={<ArrowForwardIcon />} className='editBlogLink' colorScheme='white' variant='outline'>
                                    <Link to={`/post/edit/${blog._id}`}>Edit this</Link>
                                </Button>
                                <div className="headerBlog">
                                    <h1>{blog.title}</h1>
                                    <div>
                                        <p> Created : {dates.Credate} {dates.CreTime} </p>
                                        <p> Updated : {dates.Update} {dates.UpdTime}</p>
                                    </div>
                                </div>
                                <p>{blog.shortDesc}</p> <br />
                                <img src={blog.headerImage} alt="Loading Img" /> <br />
                                <p>{blog.description}</p>
                            </>
                }
                {publishing ? <Button
                    isLoading
                    loadingText='Submitting'
                    colorScheme='teal'
                    variant='outline'
                >
                    Submit
                </Button> : <Button colorScheme='red' marginTop='14px' disabled={blog.published ==true || published ? true : false} onClick={handlePublish}>{blog.published ==true || published ? "Published": "Publish Post"}</Button>}

            </div>
        </div>
    )
}