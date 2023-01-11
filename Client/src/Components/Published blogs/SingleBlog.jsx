import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Flex, Box, Avatar, Heading, IconButton, Text, Image, Button } from '@chakra-ui/react';
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./PublishedBlogs.css";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import formateDate from '../Utilities/SetDate';
import { useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishedDone } from '../Redux/BlogsContext.js/action';


export default function SingleBlog({ blog }) {

    const [dates, setdates] = useState({});
    const cookie = new Cookies();
    const loggedUser = cookie.get("loggedUser") || undefined;
    const published = useSelector((store) => { return store.publishedBlogs.published })
    console.log(loggedUser)
    const dispatch = useDispatch();
    
    useEffect(() => {
        setdates(formateDate(blog.createdAt, blog.updatedAt))
    }, []);


    // <=================== DELETE a particular published blog ===================>
    const handleDelete = () => {
        // let url = `http://localhost:8080/publish/${blog._id}/${loggedUser._id}`;
        let url = `https://mern-app-blog-ver01.onrender.com/post/${blog._id}/${loggedUser._id}`;
        axios.delete(url).
            then((res) => {
                if (res.status === 200) {
                    let updated = published.filter((blg) => blg._id != blog._id);
                    dispatch(getPublishedDone(updated));
                    alert("Blog deleted");
                }
            }).catch((err) => console.log(err));
    }

    return (
        <>
            <Card maxW='xs' padding='0px' className='BlogCard'>
                <CardHeader padding='10px 5px' >
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            {/* <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' /> */}
                            {!blog.avatar ? <Avatar bg='teal.500' /> : <Avatar src={blog.avatar} bg='teal.500' />}

                            <Box>
                                <Heading size='sm'>{blog.user}</Heading>
                                <Text>{blog.curDate}</Text>
                                {/* <Text>{dates.Update } Time-{dates.UpdTime}</Text> */}
                            </Box>
                        </Flex>

                        <Menu closeOnSelect={false}>
                            <MenuButton colorScheme='white' color='black'>
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<BsThreeDotsVertical />}
                                />
                            </MenuButton>

                            {loggedUser ? loggedUser._id == blog.createdby ? <MenuList minWidth='150px' marginLeft="-50px" marginTop='-20px' backgroundColor='black' color='white'>
                                {/* <MenuOptionGroup defaultValue='asc' title='Order' type='radio'>
                                    <MenuItemOption value='asc'>Ascending</MenuItemOption>
                                    <MenuItemOption value='desc'>Descending</MenuItemOption>
                                </MenuOptionGroup> */}
                                <Text width='30%' onClick={handleDelete} cursor='pointer' fontSize='small'>Delete</Text>

                            </MenuList> : null : null}
                        </Menu>

                    </Flex>
                </CardHeader>
                <CardBody marginTop='-10px' padding='18px 5px 4px'>
                    <Text height='120px' textAlign='start'>{blog.shortDesc}</Text>
                </CardBody >
                <Link to={`/post/${blog._id}`} ><Image
                    objectFit='cover'
                    src={blog.headerImage}
                    // src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Image Loading'
                    height='240px'
                    width='100%'
                /></Link>

                <CardFooter
                    justify='center'
                    // flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '100px',
                        },
                    }}
                >
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                        Like
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                        Comment
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                        Share
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}