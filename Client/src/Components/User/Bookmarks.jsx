import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Stack, Flex, Image, Button, Divider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import ProgresSkelton from '../Home/ProgressBlogsSkel';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveBookmarkBlog } from '../Utilities/BookmarkBlog';
import { updateUser } from '../Redux/Auth-context/action';
import swal from 'sweetalert';

function SavedBlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const dispatch = useDispatch();
    const published = useSelector((store) => { return store.publishedBlogs.published });
    const loggedUser = useSelector((store) => { return store.user.userData });

    useEffect(() => {
        getblogs();
    }, []);

    // get all blogs bookmarked by user =====================================
    const getblogs = () => {
        try {
            setloading(true);
            let bookmarked = published.filter((blog) => loggedUser.bookmarks.includes(blog._id));
            setBlogs(bookmarked);
            setloading(false);
        } catch (err) {
            seterror(true);
        }
    }

    // Remove blog from bookmark =======================================
    const handleRemoveBookmark = async (blogId) => {
        await RemoveBookmarkBlog(blogId);
        let updated = loggedUser.bookmarks.filter((blgId) => blgId != blogId);
        // console.log("updating",updated)
        loggedUser.bookmarks = updated;
        dispatch(updateUser(loggedUser));
        swal("Blog Removed", { timer: 1300, button: false });
        getblogs();
    }

    return (
        <Box width='80%' margin='auto'>
            <Heading as="h1" textAlign="center" color='tomato'>Bookmarks</Heading>
            <hr />
            <Divider orientation='horizontal' />
            {loading ? <ProgresSkelton /> : error ? <Text fontSize='1.5rem' mt='70px' color='red' > Something went wrong !</Text> :
                <Stack spacing={2}>
                    {blogs.length > 0 ? blogs.map(blog => (

                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                            boxShadow='rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
                            mt='10px'
                            key={blog._id}
                        >
                            <Link to={`/post/${blog._id}`} state={{ pathFrom: 'bookmark' }}>
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

                    )) : <Text fontSize='1.5rem' mt='70px' >No Bookmarks yet !</Text>}
                </Stack>
            }
        </Box>
    );
}

export default SavedBlogList;