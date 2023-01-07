import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import BlogSkeleton from "./BlogSkeleton";
import "./PublishedBlogs.css";
import SingleBlog from "./SingleBlog";
import { Link } from "react-router-dom";
import {
    Tag,
    TagLabel,
    TagLeftIcon
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function PublishedBlogs() {

    const [loading, setloading] = useState(false);
    const [blogs, setallblogs] = useState([]);
    const [error, seterror] = useState(false);

    useEffect(() => {
        setloading(true);
        getPublishedBlogs();
    }, []);


    // <================ GET all Published blogs for display=================>
    const getPublishedBlogs = () => {

        let url = `http://localhost:8080/publish`;

        axios.get(url).
            then((res) => {
                //    console.log(res)   
                if (res.data.posts.length > 0) setallblogs(res.data.posts);
                else seterror(true);
            }).
            catch((err) => {
                console.log(err);
                seterror(true);
            }).finally(() => setloading(false))
    }
    console.log(blogs)
    return (
        <div id="MainDiv">
            <h1 style={{ fontSize: '1.4rem',color:'white',fontWeight:'bolder' }}>All Published blogs</h1>
            <div id="headerLinks">
                <Link to={`/create`}>
                    <Tag size='lg' variant='subtle' colorScheme='cyan'>
                        <TagLeftIcon boxSize='12px' as={AddIcon} />
                        <TagLabel size='lg'>Create Blog</TagLabel>
                    </Tag>
                </Link>
            </div>
            {/* <hr /> */}
            <div id="container">
                {loading ? <BlogSkeleton /> : error ? <h1 color="red">Something went Wrong</h1> :
                    <>
                        {
                            blogs.map((blog) => {
                                return <SingleBlog key={blog._id} blog={blog} />
                            })
                        }
                    </>
                }
            </div>
        </div>
    );
}