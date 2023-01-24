import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Stack, Flex, Image, Button, Divider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import ProgresSkelton from '../Home/ProgressBlogsSkel';
import { Link } from 'react-router-dom';


function SavedBlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);

    useEffect(() => {
        getblogs();
    }, []);

    // get all blogs bookmarked by user
    const getblogs = () => {
        setloading(true);
        fetch('https://mern-app-blog-ver01.onrender.com/publish')
            .then(response => response.json())
            .then(data => {
                setBlogs(data.posts)
            })
            .catch((err) => {
                console.log(err)
                seterror(true)
            }).
            finally(() => setloading(false))
    }

    // Remove blog from bookmark
    const handleRemoveBookmark = (blogId) => {
        alert(document.location.pathname)
    }

    return (
        <Box width='80%' margin='auto'>
            <Heading as="h1" textAlign="center" color='tomato'>Bookmarks</Heading>
            <hr />
            <Divider orientation='horizontal' />
            {loading ? <ProgresSkelton /> : error ? <Text> Something wen wrong !</Text> :
                <Stack spacing={2}>
                    {blogs.map(blog => (

                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                            boxShadow='rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
                            mt='10px'
                        >
                            <Link to={`/post/${blog._id}`} state={{pathFrom :'bookmark'}}>
                                <Image
                                    objectFit='cover'
                                    maxW={{ base: '100%', sm: '200px' }}
                                    // src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                    src={blog.headerImage}
                                    alt='Caffe Latte'
                                />
                            </Link>
                            <Stack>
                                <CardBody>
                                    <Heading size='sm'>{blog.title}</Heading>
                                    {/* <Text py='2'>
                {blog.shortDesc}
              </Text> */}
                                </CardBody>

                                <CardFooter >
                                    <Button mt='-30px' onClick={() => handleRemoveBookmark(blog._id)} variant='solid' colorScheme='blue'>
                                        Remove
                                    </Button>
                                </CardFooter>
                            </Stack>
                        </Card>

                    ))}
                </Stack>
            }
        </Box>
    );
}

export default SavedBlogList;