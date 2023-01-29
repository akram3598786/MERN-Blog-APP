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
    TagLeftIcon,
    Text
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useDispatch, useSelector } from "react-redux";
import { getPublishedDone } from "../Redux/BlogsContext.js/action";

export default function PublishedBlogs() {

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const dispatch = useDispatch();
    const published = useSelector((store) => { return store.publishedBlogs.published });
    //  console.log(published);

    useEffect(() => {
        setloading(true);
        getPublishedBlogs();
    }, []);


    // <================ GET all Published blogs for display=================>
    const getPublishedBlogs = () => {

        // let url = `http://localhost:8080/publish`;
        let url = `https://mern-app-blog-ver01.onrender.com/publish`;

        axios.get(url).
            then((res) => {
                if (res.data.posts.length > 0) {
                    //  console.log(res.data.posts)
                    dispatch(getPublishedDone(res.data.posts));
                }
                else seterror(true);
            }).
            catch((err) => {
                console.log(err);
                seterror(true);
            }).finally(() => setloading(false))
    }

    return (
        <div id="MainDiv">
            {/* <Text
                // bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgGradient='linear(to-l, white, green)'
                bgClip='text'
                fontSize='1.4rem'
                fontWeight='extrabold'
                textDecoration = 'underline'
            >
                All Published blogs
            </Text> */}
            <h1 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 'bolder', textDecoration: 'underline' }}>All Published blogs</h1>
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
                {loading ? <BlogSkeleton /> : error ? <h1 style={{ color: "red", textAlign: 'center', width: '100%' }}>Something went Wrong</h1> :
                    <>
                        {
                            published.length > 0 && published.map((blog) => {
                                return <SingleBlog key={blog._id} blog={blog} />
                            })
                        }
                    </>
                }
            </div>
        </div>
    );
}